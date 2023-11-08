import React from "react";
import styled from "styled-components";

const ViewBox = styled.ul`
  list-style: none;
`;

const IconView = styled.div`
  &:hover .tooltip {
    top: -45px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
`;

const ToolTipView = styled.span<{ isClick: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  background: #fe4949;
  color: #ffffff;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  min-width: 100px;
  ${({ isClick }) =>
    isClick &&
    `
    top: -55px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  `}
`;

interface TooltipProps {
  children: React.ReactNode | string;
  text: string;
  isClick: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, isClick }) => {
  return (
    <>
      <ToolTipView isClick={isClick} className="tooltip">
        {text}
      </ToolTipView>
      {children}
    </>
  );
};

export default Tooltip;
