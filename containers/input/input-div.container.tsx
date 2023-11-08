import InputDivFiled from "components/input-div-field";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface InputDivContainerProps {
  value: string;
  placeHolder?: string;
  outline?: boolean;
  errorMessage?: string | null;
  styleWrapper?: CSSProperties;
  label?: string;
  tabIndex?: number;
  onFocus?: () => void;
  focus?: boolean;
}

const InputDivContainer: React.FC<InputDivContainerProps> = ({
  value, 
  placeHolder,
  errorMessage,
  styleWrapper,
  outline,
  label,
  tabIndex,
  onFocus,
  focus = false,
}) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(focus);
  const errorRef = useRef(null);
  const swipeRef = useRef(null);

  const handleClickOutsideSwipe = () => {
    // setIsFocus(false)
  };
  const handleClickInsideSwip = () => {
    if(onFocus)
      onFocus();
    setIsFocus(true)
  };

  const handleClickOutside = () => {
    setIsClick(false);
  };
  const handleClickInside = () => {
    setIsClick(!isClick);
  };

  useOnClickOutside(errorRef, handleClickOutside);
  useOnClickOutside(swipeRef, handleClickOutsideSwipe);
  useEffect(() => {
    setIsFocus(focus);
  }, [focus]);
  return (
    <InputDivFiled
      setIsFocus={setIsFocus}
      value={value}
      isFocus={isFocus}
      isClick={isClick}
      placeHolder={placeHolder}
      errorRef={errorRef} 
      swipRef={swipeRef} 
      handleClickInside={handleClickInside}
      handleClickInsideSwip={handleClickInsideSwip}
      errorMessage={errorMessage}
      styleWrapper={styleWrapper}
      outline={outline}
      label={label}
      tabIndex={tabIndex}
    />
  )
}
export default InputDivContainer;