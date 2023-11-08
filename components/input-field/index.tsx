import Icon from "components/Icon";
import Tooltip from "components/tooltip";
import { MIXIN_SCREEN } from "constants/style";
import React, {
  CSSProperties,
  HTMLInputTypeAttribute,
  useRef,
  useState,
} from "react";
import { useOnClickOutside } from "usehooks-ts";
import { ErrorMessage, Input, InputWrapper, Label } from "./input-field.style";

type InputFiledType = {
  [x: string]: any;
  type?: HTMLInputTypeAttribute;
  name: string;
  placeHolder?: string;
  label?: string;
  onChange?: React.EventHandler<any>;
  autoComplete?: string;
  outline?: boolean;
  errorMessage?: string | null | any;
  register?: any;
  styleWrapper?: CSSProperties;
  min?: number;
  max?: number;
  tabIndex?: number;
  onFocus?: React.EventHandler<any>;
};

const InputField: React.FC<InputFiledType> = ({
  type = "text",
  name,
  placeHolder,
  label,
  onChange = () => {},
  autoComplete,
  outline,
  errorMessage,
  register = () => {},
  styleWrapper,
  min,
  max,
  tabIndex,
  onFocus,
  ...props
}) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setIsClick(false);
  };

  const handleClickInside = () => {
    setIsClick(!isClick);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div>
      {label ? <Label>{label}</Label> : <></>}
      <InputWrapper
        haveLabel={!!label}
        style={styleWrapper}
        isError={errorMessage}
        outline={outline}
      >
        <Input
          {...register(name, props?.validation)}
          name={name}
          placeholder={placeHolder}
          onChange={onChange}
          autoComplete={autoComplete}
          outline={outline}
          type={type}
          onFocus={onFocus}
          min={min}
          max={max}
          tabIndex={tabIndex}
          {...props}
        />
        {errorMessage && (
          <Tooltip isClick={isClick} text={errorMessage}>
            <div onClick={handleClickInside} ref={ref}>
              <Icon
                name="error-icon"
                stylePicture={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                iconStyled={`
                  @media (${MIXIN_SCREEN.mediumHeight}) {
                    width: 13px;
                  }
                `}
              />
            </div>
          </Tooltip>
        )}
      </InputWrapper>
      <ErrorMessage showError={props.showError}>
        {props.showError ? errorMessage : ""}
      </ErrorMessage>
    </div>
  );
};

export default InputField;
