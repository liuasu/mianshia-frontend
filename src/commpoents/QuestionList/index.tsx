"use client";
import "./index.css";
import { Card, List } from "antd";
import { TagList } from "@/commpoents/TagList";
import React from "react";
import Link from "next/link";

interface Props {
  questionList: API.QuestionVO[];
  cardTitle?: string;
  questionBankId?: number;
}

/**
 * 题库组件
 * @param props
 * @constructor
 */
export const QuestionList = (props: Props) => {
  const { questionList = [], cardTitle, questionBankId } = props;
  console.log(questionList);
  return (
    <Card className="question-list" title={cardTitle}>
      <List
        dataSource={questionList}
        renderItem={(item) => (
          <List.Item extra={<TagList tagList={item.tagList} />}>
            <List.Item.Meta
              title={
                <Link
                  href={
                    questionBankId
                      ? `/bank/${questionBankId}/question/${item.id}`
                      : `/question/${item.id}`
                  }
                >
                  {item.title}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
