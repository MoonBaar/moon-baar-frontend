import 'styled-components';
import {ColorsType, SizesType} from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsType;
    sizes: SizesType;
  }
}
