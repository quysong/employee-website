import React from "react";
import { Line, Load, LoadWrapper } from "./loading.style";

const Loading = () => {
  return (
    <LoadWrapper className="load-wrapp">
      <Load className="load-2">
        <Line className="line"></Line>
        <Line className="line"></Line>
        <Line className="line"></Line>
      </Load>
    </LoadWrapper>
  );
};

export default React.memo(Loading);
