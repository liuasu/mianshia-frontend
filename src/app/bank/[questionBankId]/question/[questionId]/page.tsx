"use server";
import "./index.css";
import { Flex, Menu, message } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Title from "antd/es/typography/Title";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { QuestionCard } from "@/commpoents/QuestionCard";
import Link from "next/link";

/**
 * 题库题目详情页
 * @constructor
 */
export default async function BankQuestionPage({ params }) {
  const { questionBankId, questionId } = params;

  // 获取题库详情
  let bank = undefined;
  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = res.data;
  } catch (e) {
    message.error("获取失败,请再次尝试!" + e.message);
  }
  // 获取第一道题
  let firstQuestion = undefined;
  if (bank?.questionPage?.records && bank?.questionPage?.total > 0) {
    firstQuestion = bank?.questionPage.records[0];
  }
  if (!bank) {
    return <div>题库获取失败,请刷新再次获取!!!</div>;
  }

  // 获取题目详情
  let question = undefined;
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e) {
    message.error("获取失败,请再次尝试!" + e.message);
  }
  if (!question) {
    return <div>题库获取失败,请刷新再次获取!!!</div>;
  }

  // 题目菜单列表
  const questionMenuItemList = (bank.questionPage?.records || []).map((q) => {
    return {
      label: (
        <Link href={`/bank/${questionBankId}/question/${q.id}`}>{q.title}</Link>
      ),
      key: q.id,
    };
  });

  return (
    <div id={"bank-question-page"}>
      <Flex gap={24}>
        <Sider width={240} theme={"light"} style={{ padding: "24px 0" }}>
          <Title level={3} style={{ padding: "0 20px" }}>
            {bank.title}
          </Title>
          <Menu items={questionMenuItemList} selectedKeys={question.id}/>
        </Sider>
        <Content>
          <QuestionCard question={question} />
        </Content>
      </Flex>
    </div>
  );
}
