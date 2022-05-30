const OUTSIDE_SIZE = 22;
const INSIDE_SIZE = 12;

export default (checked) => ({
  root: {
    width: OUTSIDE_SIZE,
    minWidth: OUTSIDE_SIZE,
    height: OUTSIDE_SIZE,
    minHeight: OUTSIDE_SIZE,
    backgroundColor: 'white',
    border: (theme) => `3px solid ${theme.palette.neutral.main}`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer',
    ...(checked && { borderColor: 'primary.main' }),
  },
  insideDot: {
    width: INSIDE_SIZE,
    minWidth: INSIDE_SIZE,
    height: INSIDE_SIZE,
    minHeight: INSIDE_SIZE,
    backgroundColor: 'primary.main',
    borderRadius: '50%',
    boxSizing: 'border-box',
  },
  readOnly: {
    cursor: 'default',
  },
});
