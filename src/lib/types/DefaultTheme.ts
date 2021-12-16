interface IPalette {
  main: string;
  text: string;
}

interface DefaultTheme {
  borderRadius: number; // border radius in pixels
  fontFamily: string;
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

export default DefaultTheme;
