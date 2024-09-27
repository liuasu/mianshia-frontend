import { Button, Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { batchRemoveQuestionBankQuestionUsingPost } from "@/api/questionBankQuestionController";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

interface Props {
  questionIdList: number[];
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 批量从题库移除题目
 * @param props
 * @constructor
 */
export const BatchRemoveQuestionBankModal: React.FC<Props> = (props) => {
  const { questionIdList, visible, onCancel, onSubmit } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);

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

  /**
   * 提交
   *
   * @param fields
   */
  const doSubamit = async (
    fields: API.QuestionBankQuestionBatchRemoveRequest,
  ) => {
    const hide = message.loading("正在操作");
    const questionBankId = fields.questionBankId;
    try {
      await batchRemoveQuestionBankQuestionUsingPost({
        questionIdList,
        questionBankId,
      });
      hide();
      message.success("操作成功");
      onSubmit?.();
      return true;
    } catch (error: any) {
      hide();
      message.error("操作失败，" + error.message);
      return false;
    }
  };

  return (
    <Modal
      destroyOnClose
      title={"从题库移除题目"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form}>
        <Form.Item label={"从题库移除题目"} name="questionBankIdList">
          <Select
            style={{ width: "100%" }}
            placeholder="选择题库"
            options={questionBankList.map((item) => {
              return {
                label: item.title,
                value: item.id,
              };
            })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
