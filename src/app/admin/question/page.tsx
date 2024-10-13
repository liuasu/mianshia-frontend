"use client";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import {
  batchDelQuestionsUsingPost,
  deleteQuestionUsingPost,
  listQuestionByPageUsingPost,
} from "@/api/questionController";
import {PlusOutlined} from "@ant-design/icons";
import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {Button, message, Popconfirm, Space, Table, Typography} from "antd";
import React, {useRef, useState} from "react";
import "./index.css";
import {TagList} from "@/commpoents/TagList";
import MdEditor from "@/commpoents/MdEditor";
import {UpdateQuestionBankModal} from "@/app/admin/question/components/UpdateQuestionBankModal";
import {BatchAddQuestionBankModal} from "@/app/admin/question/components/BatchAddQuestionBankModal";
import {BatchRemoveQuestionBankModal} from "@/app/admin/question/components/BatchRemoveQuestionBankModal";

/**
 * 题目管理页面
 *
 * @constructor
 */
const QuestionAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示更新所属题库窗口
  const [updateQuestionBankModalVisible, setUpdateQuestionBankModalVisible] =
    useState<boolean>(false);
  // 是否显示批量添加题目窗口
  const [batchAddQuestionModalVisible, setBatchAddQuestionModalVisible] =
    useState<boolean>(false);
  // 是否显示批量删除题目窗口
  const [batchRemoveQuestionModalVisible, setBatchRemoveQuestionModalVisible] =
    useState<boolean>(false);
  // 当前选择题目id集合
  const [selectedQuestionList, setSelectedQuestionList] = useState<number[]>(
    [],
  );

  const actionRef = useRef<ActionType>();
  // 当前题目点击的数据
  const [currentRow, setCurrentRow] = useState<API.Question>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.Question) => {
    const hide = message.loading("正在删除");
    if (!row) return true;
    try {
      await deleteQuestionUsingPost({
        id: row.id as any,
      });
      hide();
      message.success("删除成功");
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error("删除失败，" + error.message);
      return false;
    }
  };
  /**
   * 批量删除题目
   *
   * @param questionIdList
   */
  const batchQuestions = async (questionIdList: number[]) => {
    const hide = message.loading("正在操作");
    if (!questionIdList) return true;
    try {
      await batchDelQuestionsUsingPost({
        questionIdList,
      });
      hide();
      message.success("操作成功");
      return true;
    } catch (error: any) {
      hide();
      message.error("操作失败，" + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.Question>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "所属题库",
      dataIndex: "questionBankId",
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
    },
    {
      title: "内容",
      dataIndex: "content",
      valueType: "text",
      hideInSearch: true,
      ellipsis: true,
      // width: 240,
      renderFormItem: (item, { fieldProps }, form) => {
        return <MdEditor {...fieldProps} />;
      },
    },
    {
      title: "答案",
      dataIndex: "answer",
      valueType: "text",
      hideInSearch: true,
      ellipsis: true,
      // width: 640,
      renderFormItem: (item, { fieldProps }, form) => {
        return <MdEditor {...fieldProps} />;
      },
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      ellipsis: true,
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        const tagList = JSON.parse(record.tags || "[]");
        return <TagList tagList={tagList} />;
      },
    },
    {
      title: "创建用户",
      dataIndex: "userId",
      valueType: "text",
      hideInForm: true,
      hideInTable: true,
    },

    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "编辑时间",
      sorter: true,
      dataIndex: "editTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateQuestionBankModalVisible(true);
            }}
          >
            修改所属题库
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Question>
        columns={columns}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [1],
        }}
        rowKey="id"
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => {
          console.log(selectedRowKeys, selectedRows);
          return (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => {
          return (
            <Space size={16}>
              <Button
                type={"primary"}
                onClick={() => {
                  // 批量向题库添加题目
                  setSelectedQuestionList(selectedRows as any[]);
                  setBatchAddQuestionModalVisible(true);
                }}
              >
                批量向题库添加题目
              </Button>

              <Button
                type={"primary"}
                onClick={() => {
                  // 批量从题库移除题目
                  setSelectedQuestionList(selectedRows as any[]);
                  setBatchRemoveQuestionModalVisible(true);
                }}
              >
                批量从题库移除题目
              </Button>

              <Popconfirm
                title="批量删除题目"
                description="确定要删除这些题目吗?"
                onConfirm={() => {
                  //批量删除题目
                  batchQuestions(selectedRows as any[]);
                }}
                okText="确认"
                cancelText="取消"
              >
                <Button danger>批量删除题目</Button>
              </Popconfirm>
            </Space>
          );
        }}
        headerTitle={"查询表格"}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listQuestionByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
      />

      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />

      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />

      <UpdateQuestionBankModal
        questionId={currentRow?.id as number}
        visible={updateQuestionBankModalVisible}
        onCancel={() => {
          setUpdateQuestionBankModalVisible(false);
        }}
      />

      <BatchAddQuestionBankModal
        questionIdList={selectedQuestionList}
        visible={batchAddQuestionModalVisible}
        onSubmit={() => {
          setBatchAddQuestionModalVisible(false);
        }}
        onCancel={() => {
          setBatchAddQuestionModalVisible(false);
        }}
      />
      <BatchRemoveQuestionBankModal
        questionIdList={selectedQuestionList}
        visible={batchRemoveQuestionModalVisible}
        onSubmit={() => {
          setBatchRemoveQuestionModalVisible(false);
        }}
        onCancel={() => {
          setBatchRemoveQuestionModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default QuestionAdminPage;
