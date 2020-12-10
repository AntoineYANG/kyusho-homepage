import React, { Component } from 'react';
import { connect } from "react-redux";
import AppV2 from './v2/AppV2';
import AppV3 from './v3/AppV3';
import { PageConfig, VersionID } from "./v3/reducers/PageConfig";


interface AppProps {
  version: VersionID;
};

/**
 * 默认的最外层渲染元素.
 *
 * @class App
 * @extends {ConnectedComponent<AppProps, {}>}
 */
// @ts-ignore
@connect(PageConfig.mapStateToProps)
// @ts-ignore
export default class App extends Component<AppProps> {

  public render(): JSX.Element {
    const version = this.props.version;
    // console.log(version);
    // (window as any)['setVersion'] = this.props.setVersion;

    return version === 2 ? (
      <AppV2 />
    ) : version === 3 ? (
      <AppV3 />
    ) : (
      <></>
    );
  }

};
