import { Empty } from "antd";
import React from "react";

function CustomEmpty({ children, description }) {
  console.log(children);
  return (
    <div>
      {children.length ? children : <Empty description={description} />}
    </div>
  );
}

export default CustomEmpty;
