const colors = {
  primary: {
    contrastText: 'white',
    light: '#BEE6FD',
    main: '#43A6DE',
    dark: '#187AB1',
  },
  secondary: {
    contrastText: 'white',
    light: '#ffe180',
    main: '#de78bb',
    dark: '#80650d',
  },
  neutral: {
    light: '#E1E1E1',
    main: '#E1E1E1',
    dark: '#CBCBCB',
  },
  error: {
    main: '#DE4343',
  },
  warning: {
    main: '#C69C07',
  },
  white: '#FFFFFF',
  black: '#000000',
  background: '#F6F6F6',
};

const common = {
  spacing: 1,
  typography: {
    h1: {
      fontSize: 24,
    },
    h2: {
      fontSize: 20,
    },
    h3: {
      fontSize: 16,
    },
    h4: {
      fontSize: 14,
    },
    body: {
      fontSize: 12,
    },
    tiny: {
      fontSize: 10,
    },
  },
  shape: {
    borderRadius: 1,
  },
};

const theme = {
  ...common,
  palette: colors,
};

export default theme;
