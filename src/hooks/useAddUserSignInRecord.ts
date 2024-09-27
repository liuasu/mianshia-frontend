import { useEffect, useState } from "react";
import {message} from "antd";
import {addSigninUsingPost, addUserUsingPost} from "@/api/userController";

/**
 * 用户签到钩子
 */
export const useAddUserSignInRecord = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const addUserSignIn = async () => {
    setLoading(true)
    try {
      await addSigninUsingPost();
    } catch (e) {
      message.error("添加刷题记录失败" + e.message);
    }finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    addUserSignIn();
  }, []);

  return { loading };
};
