import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

// router import
import { BrowserRouter } from 'react-router-dom';

// material-ui import
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

// local-files import
import { lazyload, Loading } from './common/Loading';
import theme, { GlobalCss } from './theme';
import store from './store';

const AuthPage = lazyload(() => import('./auth'));
const AppProtected = lazyload(() => import('./AppProtected'));

function App(props) {
  const isAuthenticated = true;
  const Main = isAuthenticated ? AppProtected : AuthPage;
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <CssBaseline />
            <GlobalCss />
            <Main />
          </BrowserRouter>
        </Suspense>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
