"use client";
import "./index.css";
import { Card } from "antd";
import React from "react";
import Title from "antd/es/typography/Title";
import { TagList } from "@/commpoents/TagList";
import MdViewer from "@/commpoents/MdViewer";

interface Props {
  question: API.QuestionVO;
}

/**
 * 题库组件
 * @param props
 * @constructor
 */
export const QuestionCard = (props: Props) => {
  const { question } = props;

  return (
      <div id={"question-card"}>
        <Card>
          <Title level={1} style={{fontSize: 24}}>
            {question.title}
          </Title>
          <TagList tagList={question.tagList}/>
          <div style={{marginBottom: 15}}/>
          <MdViewer value={question.content}/>
        </Card>
        <div style={{marginBottom: 15}}/>
        <Card title={"推荐答案"}>
          <MdViewer value={question.answer} />
        </Card>
      </div>
  );
};
