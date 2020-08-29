import React, { Component } from 'react';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Home } from './routings/Home';
import { BadUrl } from './routings/BadUrl';
import { BackgroundCanvas } from './themes/BackgroundCanvas';
import { Theme } from './methods/typedict';
import { Shared } from './methods/globals';


export interface AppState {
  theme: Theme;
};

/**
 * 默认的最外层渲染元素.
 *
 * @class App
 * @extends {Component<{}, {}>}
 */
class App extends Component<{}, AppState> {

  public constructor(props: {}) {
    super(props);
    this.state = {
      theme: Shared.theme
    };
  }

  public render(): JSX.Element {
    Shared.theme = this.state.theme;

    return (
      <div className="App">
        <BackgroundCanvas initTheme={ this.state.theme } >
          <HashRouter>
            <Switch>
              <Route path="/" exact component={ Home } />
              <Route path="/**" component={ BadUrl } />
            </Switch>
          </HashRouter>
        </BackgroundCanvas>
      </div>
    );
  }

};

export default App;
