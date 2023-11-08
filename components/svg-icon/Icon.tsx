import React from 'react';
import { IconSpan } from './styles';

export const iconNames = [
  'arrow-right',
  'arrow-left',
  'arrow-down',
  'chat',
  'google',
  'share',
  'twitter',
  'globe',
  'chevron',
  'x-square',
  'check-square',
] as const;

export interface ICustomIcon {
  [x:string]: any;
  size?: number;
  color?: string;
  name: (typeof iconNames)[number];
}

export const SVGIcon: React.FC<ICustomIcon> = (props) => {
  return <IconSpan {...props} className="icon" />;
};
