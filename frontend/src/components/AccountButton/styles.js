export default {
  root: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    border: (theme) =>
      `${theme.spacing(2)} solid ${theme.palette.neutral.main}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer',
    backgroundColor: (theme) => theme.palette.white,
  },
  icon: {
    width: 45,
    height: 45,
  },
  activeIcon: {
    color: (theme) => theme.palette.white,
  },
  active: {
    border: (theme) =>
      `${theme.spacing(3)} solid ${theme.palette.primary.main}`,
    backgroundColor: (theme) => theme.palette.primary.dark,
  },
};
