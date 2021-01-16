import React, { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

// Local-files import
import theme, { GlobalCss } from './theme';
import { persistor } from './store';
import { lazyload, Loading } from './common/Loading';
import { login, logout } from './auth/AuthLoginSlice';
import { refreshTokenAPI } from './auth/AuthAPI';

const AuthPage = lazyload(() => import('./auth'));
const AppProtected = lazyload(() => import('./AppProtected'));

function App(props) {
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // AuthStateCheck
  useEffect(() => {
    (async () => {
      if (isAuthenticated === true) {
        const jwtExp = new Date(token.expires_in * 1000);
        const now = new Date();
        const reminder = jwtExp - 5 * 60 * 1000;
        if (now >= reminder && jwtExp > now) {
          try {
            const response = await refreshTokenAPI(token.id_token);
            return dispatch(login(response.data));
          } catch (error) {
            console.log(error);
          }
        } else if (now >= jwtExp) {
          console.log(true);
          dispatch(logout(false));
          return;
        }
      }
    })();
  }, [isAuthenticated, token, dispatch]);

  const Main = isAuthenticated ? AppProtected : AuthPage;
  return (
    <MuiThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <CssBaseline />
            <GlobalCss />
            <Main />
          </BrowserRouter>
        </PersistGate>
      </Suspense>
    </MuiThemeProvider>
  );
}

export default App;
