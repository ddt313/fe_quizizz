import React from 'react';
import ReactDOM from 'react-dom';

import {Theme} from './theme';
import reportWebVitals from './reportWebVitals';
import Routes from './routes';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '@blueprintjs/select';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <Routes />
    </Theme>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
