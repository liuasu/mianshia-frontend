"use client";
import { Props } from "next/script";
import "./index.css";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ReactECharts from "echarts-for-react";
import { message } from "antd";
import { getUserSigninUsingGet } from "@/api/userController";

interface Props {}

/**
 * 日历组件
 * @constructor
 * @param props
 */
export const CalendarChart = (props: Props) => {
  const {} = props;
  const year = new Date().getFullYear();
  const [dateList, setDateList] = useState<number[]>([]);
  const findUserSignIn = async () => {
    try {
      const res = await getUserSigninUsingGet({
        year,
      });
      setDateList(res.data);
    } catch (e) {
      message.error("获取刷题记录失败" + e.message);
    }
  };

  // deps 没有值，就只调用一次
  useEffect(() => {
    findUserSignIn();
  }, []);

  const optionsData = dateList.map((dateOfYear, index) => {
    const dateStr = dayjs(`${year}-01-01`)
      .add(dateOfYear - 1, "day")
      .format("YYYY-MM-DD");
    return [dateStr, 1];
  });
  // 图表配置
  // 图表配置
  const options = {
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        // 颜色从灰色到浅绿色
        color: ["#efefef", "lightgreen"],
      },
    },
    calendar: {
      range: year,
      left: 20,
      // 单元格自动宽度，高度为 16 像素
      cellSize: ["auto", 16],
      yearLabel: {
        position: "top",
        formatter: `${year} 年刷题记录`,
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
    },
  };

  return <ReactECharts className={"calendar-char"} option={options} />;
};
