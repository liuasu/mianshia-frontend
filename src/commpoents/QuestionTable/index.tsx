"use client";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import "./index.css";
import { TagList } from "@/commpoents/TagList";
import { TablePaginationConfig } from "antd";
import Link from "next/link";

/**
 * 题目表格组件
 *
 * @constructor
 */
interface Props {
  defQuestionList?: API.QuestionVO;
  defTotal?: number;
  defSearchParams: API.QuestionQueryRequest;
}

export const QuestionTable: React.FC = (props: Props) => {
  const actionRef = useRef<ActionType>();
  const { defQuestionList, defTotal, defSearchParams = {} } = props;
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defQuestionList || [],
  );
  const [total, setTotal] = useState<number>(defTotal || 0);
  const [initLoad, setInitLoad] = useState<boolean>(true);
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.Question>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      render: (_, record) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        return <TagList tagList={record.tagList} />;
      },
    },
  ];

  return (
    <div className={"question-table"}>
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        // size={"large"}
        search={{
          labelWidth: "auto",
        }}
        dataSource={questionList}
        form={{ initialValues: defSearchParams }}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `共${total}条`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        request={async (params, sort, filter) => {
          // 判断是否是首次加载
          if (initLoad) {
            setInitLoad(false);
            if (defQuestionList && defTotal) {
              return;
            }
          }
          const sortField = Object.keys(sort)?.[0] || "crateTime";
          const sortOrder = sort?.[sortField] || "desc";

          const { data, code } = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          const newData = data.records || [];
          const newTotal = data.total || 0;
          //更新questionList total
          setQuestionList(newData);
          setTotal(newTotal);
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
