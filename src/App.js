import React, { Suspense, useEffect } from 'react';
import { persistor } from './store';
import MomentUtils from '@date-io/moment';
import theme, { GlobalCss } from './theme';
import { refreshToken } from './api/AuthAPI';
import { lazyload, Loading } from './common/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { loginAction, logoutAction } from './auth/AuthStoreSlice';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

const AuthPage = lazyload(() => import('./auth'));
const AppProtected = lazyload(() => import('./AppProtected'));

function App(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const dispatch = useDispatch();
  const history = useHistory();

  // socket.connect();

  // Authentication State Check
  useEffect(() => {
    (async () => {
      if (isAuthenticated === true) {
        const jwtExp = new Date(accessToken.expires_in * 1000);
        const now = new Date();
        const reminder = jwtExp - 5 * 60 * 1000;
        if (now >= reminder && jwtExp > now) {
          try {
            const response = await refreshToken(accessToken.id_token);
            return dispatch(loginAction(response.data));
          } catch (error) {
            if (error.response) {
              history.push('/login');
            }
          }
        } else if (now >= jwtExp) {
          dispatch(logoutAction());
          history.push('/login');
        }
      }
    })();
  }, [isAuthenticated, accessToken, history, dispatch]);

  const Main = isAuthenticated ? AppProtected : AuthPage;
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Suspense fallback={<Loading />}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <CssBaseline />
              <GlobalCss />
              <Main />
            </BrowserRouter>
          </PersistGate>
        </Suspense>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;
