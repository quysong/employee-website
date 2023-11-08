import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Container, Key, Keyboard, Number } from "./number-keyboard.style";

type NumberKeyboardProps = {
  onClick?: (value: string, e?: React.MouseEvent<HTMLDivElement>) => void;
  setCurrentFocusInput?: (value: any) => void;
};

const arrNumberKeyboard = Array.from(Array(9).keys());

const NumberKeyBoard: React.FC<NumberKeyboardProps> = ({ onClick, setCurrentFocusInput }) => {
  const keyBoardRef = useRef(null);

  const handleClickOutside = () => {
    if(setCurrentFocusInput)
      setCurrentFocusInput(undefined);
  };
  useOnClickOutside(keyBoardRef, handleClickOutside);
  
  return (
    <Container ref={keyBoardRef}>
      <Keyboard>
        <Number>
          {arrNumberKeyboard.map((ele, index) => (
            <Key
              key={index}
              id={`key-board-id-${index}`}
              className="r-btn"
              onClick={(e) => onClick?.((ele + 1).toString(), e)}
            >
              {ele + 1}
            </Key>
          ))}
        </Number>
        <Number>
          <Key className="r-btn" />
          <Key className="r-btn" onClick={(e) => onClick?.("0", e)}>
            0
          </Key>
          <Key className="r-btn" onClick={(e) => onClick?.("delete", e)}>
            <svg
              width="25"
              height="17"
              viewBox="0 0 25 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 4C14.6242 7.12419 16.3758 8.87581 19.5 12"
                stroke="#EDEDED"
              />
              <path
                d="M11.5 12C11.5 12 16.3758 7.12419 19.5 4"
                stroke="#EDEDED"
              />
              <path d="M1 8L7.5 1H24.5V16L7.5 16L1 8Z" stroke="#EDEDED" />
            </svg>
          </Key>
        </Number>
      </Keyboard>
    </Container>
  );
};

export default NumberKeyBoard;
