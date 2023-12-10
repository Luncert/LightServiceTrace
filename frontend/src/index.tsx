/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import initI18n from './i18n/config';
import App from './view/App';

initI18n('en');

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <App />, root!);
