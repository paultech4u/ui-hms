import React from 'react';

// router import
import { BrowserRouter } from 'react-router-dom';

// material-ui import
import { CssBaseline } from '@material-ui/core';

// local-files import
import { lazyload } from './common/Loading';
import { GlobalCss } from './theme';

const AuthPage = lazyload(() => import('./auth'));
const AppProtected = lazyload(() => import('./AppProtected'));

function App(props) {
  const Main = true ? AuthPage : AppProtected;
  return (
    <BrowserRouter>
      <CssBaseline />
      <GlobalCss />
      <Main />
    </BrowserRouter>
  );
}

export default App;
