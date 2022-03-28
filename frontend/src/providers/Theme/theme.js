const colors = {
  primary: {
    contrastText: 'white',
    light: '#91ffa2',
    main: '#14db32',
    dark: '#0d801e',
  },
  secondary: {
    contrastText: 'white',
    light: '#ffe180',
    main: '#c79f1e',
    dark: '#80650d',
  },
  neutral: {
    light: '#fcfcfc',
    main: '#f2f2f2',
    dark: '#d4d4d4',
  },
};

const common = {
  spacing: 1,
  fontSize: {
    tiny: 10,
    small: 12,
    medium: 14,
    big: 16,
    huge: 20,
  },
};

const theme = {
  ...common,
  palette: colors,
};

export default theme;
