import React, { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

// local-files import
import theme, { GlobalCss } from './theme';
import { persistor } from './store';
import { lazyload, Loading } from './common/Loading';
import { LogoutAction } from './auth/AuthLoginStoreSlice';
import { setToken, removeToken, getToken } from './utils/localstorage';
import { FetchUserProfileAction } from './user/UserStoreSlice';

const AuthPage = lazyload(() => import('./auth'));
const AppProtected = lazyload(() => import('./AppProtected'));

function App(props) {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { info } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();


  // AuthStateCheck
  useEffect(() => {
    (async () => {
      const { accessToken } = getToken();
      if (!isAuthenticated) {
        removeToken();
      } else if (!isAuthenticated && !accessToken) {
        // dispatch(LogoutAction(info.user._id));
        return;
      } else {
        const tokenExp = new Date(token.expires_in * 1000);
        const now = new Date();
        if (tokenExp < now) {
          // dispatch(LogoutAction(info.user._id));
          removeToken();
          return;
        } else {
          setToken(token.id_token, token.expires_in);
          dispatch(FetchUserProfileAction(token.id_token));
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
