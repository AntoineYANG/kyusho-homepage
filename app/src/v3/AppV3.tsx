import React, { Component } from 'react';
import './window.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { BadUrl } from './pages/BadUrl';
import { Papers } from './pages/Papers';
import { StoragePage } from './pages/StoragePage';
import { createStyle } from 'reacss';
import { OptionMenu } from './containers/OptionMenu';
import { SchemeConfig, ColorScheme } from "./reducers/SchemeConfig";
import { connect } from 'react-redux';


export interface AppV3Props {
  scheme: ColorScheme;
};

const AppSchemeLight = createStyle({
  "div": {
    textAlign:      'center',
    fontFamily:     "var(--monospace)",
    scrollBehavior: "smooth",
    textRendering:  "optimizeSpeed",  /* 渲染速度优先 */
    width:          '100vw',
    minHeight:      '100vh',
    background:     'radial-gradient(circle at 50% 57%,'
                    + ' rgb(243,236,189), rgb(243,236,189) 8%,'
                    + ' rgb(182,223,155) 14%, rgb(176,221,155) 22%,'
                    + ' rgb(113,199,141) 40%, rgb(101,176,130),'
                    + ' rgb(90,159,117), rgb(53,64,71) 122%'
                    + ')'
  }
});

const AppSchemeDark = createStyle({
  "div": {
    textAlign:      'center',
    fontFamily:     "var(--monospace)",
    scrollBehavior: "smooth",
    textRendering:  "optimizeSpeed",  /* 渲染速度优先 */
    width:          '100vw',
    minHeight:      '100vh',
    background:     'radial-gradient(circle at 50% 57%,'
                    + ' rgb(38,27,27), rgb(38,25,27) 8%,'
                    + ' rgb(37,24,26) 14%, rgb(33,20,28) 22%,'
                    + ' rgb(30,22,36) 40%, rgb(30,14,28),'
                    + ' rgb(20,9,19), rgb(11,6,10) 122%'
                    + ')'
  }
});

/**
 * 默认的最外层渲染元素.
 */
// @ts-ignore
@connect(SchemeConfig.mapStateToProps)
// @ts-ignore
class AppV3 extends Component<AppV3Props> {

  public render(): JSX.Element {
    const useStyle = this.props.scheme === "dark" ? AppSchemeDark : AppSchemeLight;

    return (
      <>
        <div className={ useStyle.id } >
          <svg width="0" height="0"> 
            <filter id="filter">
              <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="6"></feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="100"></feDisplacementMap>
            </filter>
          </svg>
          <Router>
            <Switch>
              <Route path="/" exact >
                <Home />
              </Route>
              <Route path="/paper" exact >
                <Papers />
              </Route>
              <Route path="/storage" exact >
                <StoragePage />
              </Route>
              <Route path="/**" >
                <BadUrl />
              </Route>
            </Switch>
          </Router>
        </div>
        <OptionMenu />
      </>
    );
  }
};

export default AppV3;
