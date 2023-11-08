import dynamic from 'next/dynamic';
import { ICustomIcon } from './Icon';

export const Icon = dynamic<ICustomIcon>(import('./Icon').then((comp) => comp.SVGIcon));
