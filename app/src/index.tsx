/*
 * @Author: Kanata You 
 * @Date: 2020-12-05 22:45:47 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-05 22:46:29
 */

// @ts-nocheck
// 这条指令是为了避免运行时检测 App 组件缺失由 redux 装载的 props 内容
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './v3/reducers';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store } >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
