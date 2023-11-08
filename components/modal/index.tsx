import React from "react";
import { ModalContainer, ModalDialog } from "./modal.style";

interface BasicModalProps {
  children: React.ReactNode | string;
}

const BasicModal: React.FC<BasicModalProps> = ({ children }) => {
  return (
    <ModalContainer>
      <ModalDialog>{children}</ModalDialog>
    </ModalContainer>
  );
};

export default React.memo(BasicModal);
