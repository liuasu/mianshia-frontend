import { updateQuestionUsingPost } from "@/api/questionController";
import { Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  addQuestionBankQuestionUsingPost,
  listQuestionBankQuestionByPageUsingPost,
  removeQuestionBankQuestionUsingPost,
} from "@/api/questionBankQuestionController";
import {
  getQuestionBankVoByIdUsingGet,
  listQuestionBankByPageUsingPost,
  listQuestionBankVoByPageUsingPost,
} from "@/api/questionBankController";

interface Props {
  questionId: number;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionUpdateRequest) => {
  const hide = message.loading("正在更新");
  try {
    await updateQuestionUsingPost(fields);
    hide();
    message.success("更新成功");
    return true;
  } catch (error: any) {
    hide();
    message.error("更新失败，" + error.message);
    return false;
  }
};

/**
 * 更新所属题库弹窗
 * @param props
 * @constructor
 */
export const UpdateQuestionBankModal: React.FC<Props> = (props) => {
  const { questionId, visible, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);

  // 获取当前题目的所属题库
  const findCurrentInBankList = async () => {
    try {
      const res = await listQuestionBankQuestionByPageUsingPost({
        questionId,
      });
      // 取出题库id
      const bankIdList = (res.data.records ?? []).map(
        (item) => item.questionBankId,
      );
      console.log(res.data);
      form.setFieldValue("questionBankIdList" as any, bankIdList);
    } catch (e: any) {
      message.error("所属题库获取失败," + e.message);
    }
  };
  useEffect(() => {
    if (questionId) {
      findCurrentInBankList();
    }
  }, [questionId]);

  // 获取所有题库
  const AllQuestionBankList = async () => {
    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize: 200,
      });
      setQuestionBankList(res.data?.records ?? []);
    } catch (e: any) {
      message.error("题库获取失败" + e.message);
    }
  };
  useEffect(() => {
    AllQuestionBankList();
  }, []);

  return (
    <Modal
      destroyOnClose
      title={"更新所属题库"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form}>
        <Form.Item label={"所属题库"} name="questionBankIdList">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="选择所属题库"
            options={questionBankList.map((item) => {
              return {
                label: item.title,
                value: item.id,
              };
            })}
            onSelect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await addQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("绑定题库失败，" + error.message);
              }
            }}
            onDeselect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await removeQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("取消绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("取消绑定题库失败，" + error.message);
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
