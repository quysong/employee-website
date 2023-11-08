import { MIXIN_SCREEN } from "constants/style";
import { CSSProperties } from "react";
import styled from "styled-components";

const Image = styled.img<{iconStyled?: string}>`
  ${({iconStyled})=> iconStyled}
`

interface IconProps {
  name: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
  stylePicture?: CSSProperties;
  [x: string]: any;
  iconStyled?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  alt,
  width,
  height,
  style,
  stylePicture,
  iconStyled,
  ...props
}) => {
  return (
    <picture style={stylePicture} {...props}>
      <Image
        src={`/icons/${name}.svg`}
        alt={`${alt && "icon"}`}
        width={width}
        height={height}
        style={style}
        iconStyled={iconStyled}
      />
    </picture>
  );
};

export default Icon;
