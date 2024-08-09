import { ThemeProvider } from '@mui/material';
import AppRoute from './AppRoute';
import theme from './theme';

const App = () => {  
  return (
    <ThemeProvider theme={theme}>
      <AppRoute/>
    </ThemeProvider>
  );
};

export default App;
