"use client";
import React from "react";
import "./index.css"

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div
        className={"global-footer"}
      style={{
        textAlign: "center",
        paddingBlockStart: 12,
      }}
    >
      <div>© {currentYear} 面试刷题网</div>
      <div>
        <a href={"https://github.com/liuasu"} target={"_blank"}>
          作者：程序员 - 六啊朔
        </a>
      </div>
    </div>
  );
}
