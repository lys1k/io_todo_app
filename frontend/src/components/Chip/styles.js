export default () => ({
  root: {
    minWidth: 120,
    height: 35,
    borderRadius: 50,
    color: (theme) => theme.palette.secondary.contrastText,
    textTransform: 'none',
    backgroundColor: (theme) => theme.palette.secondary.main,
    margin: 10,
    '& .MuiChip-label': { fontSize: 15 },
  },
  icon: {
    width: 30,
    height: 30,
    color: (theme) => theme.palette.white,
  },
});
