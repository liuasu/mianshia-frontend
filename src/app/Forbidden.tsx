import {Button, Result} from "antd";

/**
 * 无权限访问页面
 * @constructor
 */
export const Forbidden = () => {
  return (
    <Result
      status={403}
      title={"403"}
      subTitle={"抱歉，你暂无权限访问该页面!!!"}
      extra={
        <Button type={"primary"} href={"/"}>
          返回首页
        </Button>
      }
    />
  );
};
