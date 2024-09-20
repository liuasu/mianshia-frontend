"use server";
import "./index.css";
import { Divider, Flex, message } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import { QuestionBankList } from "@/commpoents/QuestionBankList";
import { QuestionList } from "@/commpoents/QuestionList";

export default async function HomePage() {
  // 获取题库、题目数据
  let questionBankList = [];
  let questionList = [];
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionBankList = res.data.records ?? [];
  } catch (e) {
    message.error("获取失败,请再次尝试!" + e.message);
  }
  try {
    const res = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionList = res.data.records ?? [];
  } catch (e) {
    message.error("获取失败,请再次尝试!" + e.message);
  }

  return (
    <div id={"home-page"} className={"max-width-content"}>
      {/*题库*/}
      <Flex justify={"space-between"} align={"center"}>
        <Title level={3}>最新题库</Title>
        <Link href={"/banks"}>查看更多</Link>
      </Flex>
      <QuestionBankList questionBankList={questionBankList} />

      <Divider />
      {/*题目*/}
      <Flex justify={"space-between"} align={"center"}>
        <Title level={3}>最新题目</Title>
        <Link href={"/questions"}>查看更多</Link>
      </Flex>
      <QuestionList questionList={questionList} />
    </div>
  );
}
