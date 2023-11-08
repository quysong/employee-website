import Icon from "components/Icon";
import Tooltip from "components/tooltip";
import { FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, MIXIN_SCREEN } from "constants/style";
import { useRef, useState } from "react";
import styled from "styled-components";
import { useOnClickOutside } from "usehooks-ts";

const TextAreaView = styled.textarea<{error?: boolean}>`
  background-color: #FFFFFF;
  border-radius: 12px;
  min-height: 120px;
  max-width: 220px;
  min-width: 190px;
  padding: 9px 20px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Montserrat';
  &::placeholder {
    color: rgba(96, 96, 96, 0.4);
    font-family: ${FONT_FAMILY.montserrat} !important;
    font-weight: ${FONT_WEIGHT.fontWeight400};
    font-size: ${FONT_SIZE.fontSize14};
    line-height: 17px;
  }
  ${({error}) => error && `
     border: 2px solid red;
  `}
`

interface TextAreaProps {
  placeholder: string;
  name: string,
  [x: string]: any
}

const TextArea: React.FC<TextAreaProps> = ({placeholder, name, errorMessage}) => {
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
    <>
      <TextAreaView error={errorMessage}  placeholder={placeholder} name={name}/>
      {errorMessage && (
          <Tooltip isClick={isClick} text={errorMessage}>
            <div style={{
              position: 'absolute',
              right: 5,
              top:  5,
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
   </>
  )
}

export default TextArea;
