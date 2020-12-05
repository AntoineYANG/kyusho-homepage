import React from 'react';
import './window.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { BadUrl } from './pages/BadUrl';


export interface AppV3Props {};

/**
 * 默认的最外层渲染元素.
 */
const AppV3 = (_props: AppV3Props): JSX.Element => {
  return (
    <div className="App AppV3" >
      <Router>
        <Switch>
          <Route path="/" exact >
            <Home />
          </Route>
          <Route path="/**" >
            <BadUrl />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default AppV3;
