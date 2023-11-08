import styled from 'styled-components';
import { ICustomIcon } from './Icon';

export const IconSpan = styled.span<ICustomIcon>`
  width: ${({ size }) => (size ? size : '16')}px;
  height: ${({ size }) => (size ? size : '16')}px;
  -webkit-mask: url(/icons/${({ name }) => name}.svg);
  mask: url(/icons/${({ name }) => name}.svg);
  -webkit-mask-size: contain;
  mask-size: contain;
  background-color: ${({ color }) => (color ? color : '#606060')};
`;
