import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});

export default lightTheme;
