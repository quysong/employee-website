import Toast from "components/toast";
import { NotificationType } from "interfaces/notification.interface";
import React, { useEffect } from "react";

interface ToastContainerProps {
  notification: NotificationType;
  setNotification: (notification: NotificationType) => void;
}

const initNotification: NotificationType = {
  text: null,
  type: null
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  notification,
  setNotification,
}) => {
  useEffect(() => {
    if (notification.text) {
      setTimeout(() => {
        setNotification(initNotification)
      }, 3000);
    }
  }, [notification.text, setNotification]);
  return !!notification.text ? (
    <Toast
      active={!!notification.text && !!notification.type}
      content={notification.text}
      type={notification.type}
    />
  ) : (
    <></>
  );
};

export default ToastContainer;
