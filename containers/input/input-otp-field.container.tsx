import InputOTPField from "components/input-otp-field";
interface InputOtpFieldContainerType {
  [x:string]: any,
  length: number,
  setCurrentFocusInput: (value: number | null) => void;
  currentFocusInput: number | null;
}
const InputOtpFieldContainer = ({
  length,
  values,
  setCurrentFocusInput,
  currentFocusInput
}: InputOtpFieldContainerType) => {
  return (
    <InputOTPField 
      currentFocusInput={currentFocusInput}
      setCurrentFocusInput={setCurrentFocusInput}
      values={values}
      length={length}
      placeholder={'0'}
    />
  )
} 

export default InputOtpFieldContainer;
