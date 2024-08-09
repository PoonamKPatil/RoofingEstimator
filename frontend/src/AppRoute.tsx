import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { protectedRouteList, routeList } from './routes/routeList'
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

const loading = () => (
    <div className="center">
      loading!!!
    </div>
);

const AppRoute = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={loading()}>
        <Header/>
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
        {
        protectedRouteList.map((value) => (
            <Route
            key={value.path}
            path={value.path}
            element={(
                <ProtectedRoute><value.component /></ProtectedRoute>
            )}
            />
        ))
        }
        </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default AppRoute