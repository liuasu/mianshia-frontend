"use server";
import "./index.css";
import {message} from "antd";
import Title from "antd/es/typography/Title";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import {QuestionBankList} from "@/commpoents/QuestionBankList";

/**
 * 题库页
 * @constructor
 */
export default async function BankPage() {
  // 获取题库数据
  let questionBankList = [];
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize: 200,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionBankList = res.data.records ?? [];
  } catch (e) {
    message.error("获取失败,请再次尝试!" + e.message);
  }

  return (
    <div id={"bank-page"} className={"max-width-content"}>
      {/*题库*/}
      <Title level={3}>题库集</Title>
      <QuestionBankList questionBankList={questionBankList} />
    </div>
  );
}
