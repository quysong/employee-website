import { GLOBAL_COLOR } from "constants/style";
import styled from "styled-components";

export const ContainerCard = styled.section<{
  bgColor?: string;
  styles?: string;
  isError?: boolean;
}>`
  width: 100%;
  min-height: 183px;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.24);
  border-radius: 24px;
  padding: 20px;
  box-sizing: border-box;
  border: 2px solid ${({ isError }) => (isError ? "red" : "transparent")};
  background-color: ${(props) =>
    props?.bgColor ? props.bgColor : GLOBAL_COLOR.defaultColor80};
  ${(props) => props?.styles};
`;
