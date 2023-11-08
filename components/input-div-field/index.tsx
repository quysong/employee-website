import Icon from "components/Icon";
import Tooltip from "components/tooltip";
import React, {
  CSSProperties,
  HTMLInputTypeAttribute
} from "react";
import { InputDiv, InputWrapper, Label, PlaceHolder } from "./input-field.style";

type InputTempFiledType = {
  type?: HTMLInputTypeAttribute;
  placeHolder?: string;
  label?: string;
  onChange?: React.EventHandler<any>;
  outline?: boolean;
  errorMessage?: string | null;
  styleWrapper?: CSSProperties;
  tabIndex?: number;
  setIsFocus: (focus: boolean) => void; 
  value: string;
  isFocus: boolean;
  isClick: boolean;
  handleClickInside: () => void;
  handleClickInsideSwip: () => void;
  errorRef: any; 
  swipRef: any; 
};

const InputDivFiled: React.FC<InputTempFiledType> = ({
  placeHolder,
  label,
  outline,
  errorMessage,
  styleWrapper,
  tabIndex,
  value,
  isFocus,
  isClick,
  handleClickInside,
  handleClickInsideSwip,
  errorRef,
  swipRef
}) => {
  return (
    <div>
      {label ? <Label>{label}</Label> : <></>}
      <InputWrapper
        haveLabel={!!label}
        style={styleWrapper}
        isError={errorMessage}
        isFocus={isFocus}
        outline={outline}
        onClick={handleClickInsideSwip} 
        ref={swipRef}
      >
        <InputDiv
          tabIndex={tabIndex}
        >
          {value ? value : <PlaceHolder>{placeHolder}</PlaceHolder>}
        </InputDiv>
        {errorMessage && (
          <Tooltip isClick={isClick} text={errorMessage}>
            <div 
              onClick={handleClickInside} 
              ref={errorRef}>
              <Icon
                name="error-icon"
                stylePicture={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </div>
          </Tooltip>
        )}
      </InputWrapper>
    </div>
  );
};

export default InputDivFiled;
