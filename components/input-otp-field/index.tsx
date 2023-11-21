import React from "react";
import PinInput from "react-pin-input";
import { InputOTPWrapper } from "./input-otp-field.style";

type InputOTPFieldProps = {
  [x: string]: any;
  name?: string;
  placeHolder?: string;
  refOtp?: any;
  initialValue?: string;
};

const InputOTPField: React.FC<InputOTPFieldProps> = ({
  name,
  placeHolder = "0",
  refOtp,
  initialValue,
  ...props
}) => {
  return (
    <InputOTPWrapper isError={props.isError}>
      <PinInput
        initialValue={initialValue}
        length={6}
        ref={refOtp}
        placeholder="0"
        type="numeric"
        inputMode="numeric"
        onChange={props.onChange}
      />
      {/* {Array.from(Array(6).keys()).map((item) => (
        <InputDivContainer 
          styleWrapper={{
            minWidth: '45px',
            textAlign: 'center'
          }}
          key={item} 
          value={props?.values?.[item] || ""} 
          placeHolder={placeHolder}
          onFocus={()=> props.setCurrentFocusInput(item)}
          focus={item === props.currentFocusInput}
        />
      ))} */}
    </InputOTPWrapper>
  );
};

export default InputOTPField;
