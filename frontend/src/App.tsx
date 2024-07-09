import { ThemeProvider } from '@mui/material';
import { Suspense } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Header from './components/Header';
import routeList from './routes/routeList';
import theme from './theme' 
const loading = () => (
  <div className="center">
    loading!!!
  </div>
);

const App = () => (
  <BrowserRouter>
    <Suspense fallback={loading()}>
      <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        {
          routeList.map((value) => (
            <Route
              key={value.path}
              path={value.path}
              element={(
                <value.component />
              )}
            />
          ))
        }
      </Routes>
      </ThemeProvider>
    </Suspense>
  </BrowserRouter>
);

export default App;
