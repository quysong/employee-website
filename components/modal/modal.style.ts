import { MIXIN_SCREEN } from "constants/style";
import styled from "styled-components";

export const ModalContainer = styled.div`
  position: relative;
  &:before {
    content: "";
    display: block;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
`;
export const ModalDialog = styled.div`
  position: relative;
  width: 100%;
  max-width: ${MIXIN_SCREEN.smallScreen};
  border-radius: 5px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
`;
