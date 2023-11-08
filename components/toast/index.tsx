import Icon from "components/Icon";
import React, { ReactNode } from "react";
import { Progress, ToastContent, ToastText, ViewBox } from "./toast.style";

interface ToastProps {
  active: boolean;
  content: string;
  type: "error" | "success" | "warning" | null;
}

const Toast: React.FC<ToastProps> = ({ active, content, type }) => {
  return (
    <ViewBox active={active}>
      <ToastContent>
        <Icon name={`${type}-icon-toast`} alt="icon error" />
        <ToastText dangerouslySetInnerHTML={{__html: content}}></ToastText>
      </ToastContent>
      <Progress type={type} active={active} className="toast-progress active"></Progress>
    </ViewBox>
  );
};

export default Toast;
