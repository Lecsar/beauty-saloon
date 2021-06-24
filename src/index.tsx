import {StrictMode} from 'react';
import {render} from 'react-dom';
import {App} from './NewApp';

import './style.css';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
