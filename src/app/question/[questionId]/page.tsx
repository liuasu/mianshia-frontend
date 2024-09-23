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
 * 题目详情页
 * @constructor
 */
export default async function QuestionPage({ params }) {
  const { questionId } = params;

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

  return (
    <div id={"question-page"}>
      <QuestionCard question={question} />
    </div>
  );
}
