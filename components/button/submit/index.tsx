import Icon from "components/Icon";
import React, { CSSProperties, MouseEvent, ReactNode } from "react";

import { NormalButton as NormalButtonStyled } from "./submit-button.style";

type NormalButtonProps = {
  children: ReactNode | string | undefined;
  iconName?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  type?: "normal" | "iconLeft";
  style?: CSSProperties;
  buttonType?: "button" | "reset" | "submit";
};

const NormalButton: React.FC<NormalButtonProps> = ({
  children,
  onClick,
  style,
  type = "normal",
  iconName,
  buttonType = "button",
}) => {
  return (
    <NormalButtonStyled
      onClick={onClick}
      style={style}
      btnType={type}
      type={buttonType}
    >
      {type === "iconLeft" && iconName ? (
        <Icon
          name={iconName}
          alt="icon left button"
          style={{
            marginRight: "9px",
            marginTop: 3,
          }}
        />
      ) : (
        <></>
      )}
      {children}
    </NormalButtonStyled>
  );
};

export default NormalButton;
