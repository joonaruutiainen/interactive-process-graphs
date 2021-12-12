import { DefaultTheme, ElomaticTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  borderRadius: 7,
  fontFamily: 'Helvetica',
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      main: '#ffffff',
      text: '#000000',
    },
    secondary: {
      main: '#dfe4e7',
      text: '#ffffff',
    },
    background: {
      main: '#bfbfbf',
      text: '#000000',
    },
  },
};

export const darkTheme: DefaultTheme = {
  borderRadius: 7,
  fontFamily: 'Helvetica',
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      main: '#2e2f33',
      text: '#ffffff',
    },
    secondary: {
      main: '#58595c',
      text: '#121212',
    },
    background: {
      main: '#121212',
      text: '#ffffff',
    },
  },
};

export const customTheme: ElomaticTheme = {
  borderRadius: 7,
  fontFamily: 'Helvetica',
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      main: '#003b72',
      text: '#ffffff',
    },
    secondary: {
      main: '#002e41',
      text: '#ffffff',
    },
    background: {
      main: '#e6f3f8',
      text: '#000000',
    },
  },
};
