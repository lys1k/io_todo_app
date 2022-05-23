export default {
  root: {
    width: 80,
    height: 50,
    borderRadius: 10,
    border: (theme) =>
      `${theme.spacing(1)} solid ${theme.palette.neutral.main}`,
    backgroundColor: (theme) => theme.palette.white,
    color: (theme) => theme.palette.black,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxSizing: 'border-box',
    rowGap: 0,
  },
  icon: {
    width: 25,
    height: 25,
    color: (theme) => theme.palette.black,
  },
  iconActive: {
    color: (theme) => theme.palette.white,
  },

  active: {
    border: (theme) =>
      `${theme.spacing(3)} solid ${theme.palette.primary.main}`,
    backgroundColor: (theme) => theme.palette.primary.dark,
    color: (theme) => theme.palette.white,
  },
};
