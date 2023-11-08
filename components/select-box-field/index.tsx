import Icon from "components/Icon";
import Tooltip from "components/tooltip";
import { MIXIN_SCREEN } from "constants/style";
import { LeaveForm } from "interfaces/leave.interface";
import { CSSProperties, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";
import { Label, Option, SelectBox, WrapSelectBox } from "./select-box-field.style";

type OptionProps = {
  key: string | number,
  value: string
}

interface SelectBoxFieldProps {
  label?: string;
  options: OptionProps[];
  name: "leaveType" | "dateFromDay" | "dateFromMonth" | "dateFromYear" | "dateToDay" | "dateToMonth" | "dateToYear";
  styles?: CSSProperties | undefined;
  placeholder?: string;
  register: UseFormRegister<LeaveForm>
  validation: any;
  errorMessage: any;
  [x: string]: any;
}

const SelectBoxField: React.FC<SelectBoxFieldProps> = ({
  options,
  label,
  name,
  styles,
  placeholder,
  register,
  validation,
  errorMessage,
  onChange,
  props
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
      <Label>{label}</Label>
      <WrapSelectBox>
        <SelectBox 
          {...register(name, {
            ...validation,
            onChange: onChange
          })}
          {...props}
          name={name} style={styles} >
          {placeholder && <Option value="" disabled selected hidden>{placeholder}</Option> }
          {options.map((ele: OptionProps)=> <Option key={`select-box-${ele.key}`} value={ele.key}>{ele.value}</Option>)}
        </SelectBox>
        {errorMessage && (
          <Tooltip isClick={isClick} text={errorMessage}>
            <div style={{
              position: 'absolute',
              right: 15,
              top: '50%',
              transform: 'translateY(-50%)'
            }} onClick={handleClickInside} ref={ref}>
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
      </WrapSelectBox>
    </div>
  );
};

export default SelectBoxField;
