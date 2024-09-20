"use server";
import "./index.css";
import {message} from "antd";
import Title from "antd/es/typography/Title";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";
import {QuestionTable} from "@/commpoents/QuestionTable";

/**
 * 题目页
 * @constructor
 */
export default async function QuestionsPage({searchParams}) {
  // 获取请求中的参数
  const {q:searchText} = searchParams;
  // 获取题目数据
  let questionList = [];
  let total = 0;
  try {
    const res = await listQuestionVoByPageUsingPost({
      title: searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionList = res.data.records ?? [];
    total = res.data.total;
  } catch (e) {
    message.error("获取失败,请再次尝试!" + e.message);
  }

  return (
    <div id={"questions-page"} className={"max-width-content"}>
      {/*题库*/}
      <Title level={3}>题目集</Title>
      <QuestionTable  defQuestionList={questionList} defTotal={total} defSearchParams={{title: searchText}}/>
    </div>
  );
}
