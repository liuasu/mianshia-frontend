"use client";
import "./index.css";
import {Avatar, Card, List, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";

interface Props {
  questionBankList: API.QuestionBankVO[]
}

/**
 * 题库组件
 * @param props
 * @constructor
 */
export const QuestionBankList = (props: Props) => {
  const { questionBankList = [] } = props;

  const questionBankCard = (questionBank: API.QuestionBankVO) => {
    return (
      <Card>
          <Link href={`/bank/${questionBank.id}`}>
              <Card.Meta
                  avatar={<Avatar src={questionBank.picture} />}
                  title={questionBank.title}
                  description={<Typography.Paragraph type={"secondary"} ellipsis={{rows:1}} style={{marginBottom:0}}>
                      {questionBank.description}
                  </Typography.Paragraph>}
              />
          </Link>
      </Card>
    );
  };
  return (
    <div className="question-bank-list">
      <List
        grid={{
          gutter: 16,
          column: 4,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
        }}
        dataSource={questionBankList}
        renderItem={(item) => <List.Item>{questionBankCard(item)}</List.Item>}
      />
    </div>
  );
};
