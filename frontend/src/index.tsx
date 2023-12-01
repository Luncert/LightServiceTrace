/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import { Route, Router, Routes } from '@solidjs/router';
import { ThemeProvider, createTheme } from '@suid/material';
import initI18n from './i18n/config';
import Home from './view/Home';

initI18n('zh');

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const lightTheme = createTheme({
  palette: {
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'light'
  },
});

render(() => 
  <ThemeProvider theme={darkTheme}>
    <Router>
      <Routes>
        {/* <Route path="/signin" component={Signin} /> */}
        <Route path="/" component={Home} />
      </Routes>
    </Router>
  </ThemeProvider>,
root!);
