import "./index.css";
import { Tag } from "antd";

interface Props {
  tagList?: string[];
}

/**
 * 标签组件
 * @param props
 * @constructor
 */
export const TagList = (props: Props) => {
  const { tagList = [] } = props;

  return (
    <div className="tag-list">
      {tagList.map((tag) => {
        return <Tag key={tag}>{tag}</Tag>;
      })}
    </div>
  );
};
