/** ESPOIR TEMPLATE */
      
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@views';

import './index.scss';


const container = document.getElementById('root');
// @ts-ignore
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
