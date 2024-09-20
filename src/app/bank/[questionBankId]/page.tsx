"use server";
import "./index.css";
import { Avatar, Card, message } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { QuestionList } from "@/commpoents/QuestionList";

/**
 * 题库详情页
 * @constructor
 */
export default async function BankPage({ params }) {
  const { questionBankId } = params;

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

  if (!bank) {
    return <div>题库获取失败,请刷新再次获取!!!</div>;
  }

  return (
    <div id={"bank-page"} className={"max-width-content"}>
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={75} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <Paragraph type={"secondary"}>{bank.description}</Paragraph>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <QuestionList
        questionList={bank?.questionPage?.records || []}
        cardTitle={`题目列表(${bank?.questionPage.total || 0})`}
        questionBankId={bank.id}
      />
    </div>
  );
}
