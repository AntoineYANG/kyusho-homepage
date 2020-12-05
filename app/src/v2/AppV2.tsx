import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './routers/Home';
import { BadUrl } from './routers/BadUrl';
import { BackgroundCanvas } from './themes/BackgroundCanvas';
import { Theme } from './methods/typedict';
import { Shared } from './methods/globals';
import { Settings } from './routers/Settings';
import { ProductDetail } from './routers/ProductDetail';


export interface AppV2State {
  theme: Theme;
};

/**
 * 默认的最外层渲染元素.
 *
 * @class AppV2
 * @extends {Component<{}, {}>}
 */
class AppV2 extends Component<{}, AppV2State> {

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
        {/* <Opening /> */}
        <BackgroundCanvas initTheme={ this.state.theme } >
          <div style={{
            display: "block",
            margin: "10vh 5vw 1vh"
          }} >
            <a href="/" style={{
              color: "rgb(255,215,61)",
              cursor: "none",
              fontSize: "160%"
            }} >
              This website has an higher version, click here to move to v3.x!
            </a>
          </div>
          <Router>
            <Switch>
              <Route path="/v2/" exact component={ Home } />
              <Route path="/v2/settings" exact component={ Settings } />
              <Route path="/v2/product/*" exact component={ ProductDetail } />
              <Route path="/v2/**" component={ BadUrl } />
            </Switch>
          </Router>
        </BackgroundCanvas>
      </div>
    );
  }

};

export default AppV2;
