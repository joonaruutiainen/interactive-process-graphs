import 'styled-components';

interface IPalette {
  main: string;
  text: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    palette: {
      common: {
        black: string;
        white: string;
      };
      primary: IPalette;
      secondary: IPalette;
      background: IPalette;
   };

  }
}