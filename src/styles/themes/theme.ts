import {DefaultTheme} from 'styled-components';

const colors = {
  primary: '#5D9D8A',
  secondary: '#EDFDF7',
  neutral1: '#030712',
  neutral2: '#6B7280',
  neutral3: '#9CA3AF',
  neutral4: '#E4DFE3',
  neutral5: '#F3F4F6',
  neutral_green: '#C1D7D4',
};

const sizes = {
  xl: '2rem',
  l: '1.8rem',
  m: '1.6rem',
  s: '1.4rem',
  xs: '1.2rem',
  xxs: '1rem',
};

export type ColorsType = typeof colors;
export type SizesType = typeof sizes;

export const theme: DefaultTheme = {
  colors,
  sizes,
};
