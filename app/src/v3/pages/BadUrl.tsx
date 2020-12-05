/*
 * @Author: Kanata You 
 * @Date: 2020-12-02 20:47:07 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-06 00:42:46
 */

import React, { Component } from "react";


/**
 * 这个页面级组件在无法访问对应网址时渲染.
 * 
 * @export
 * @class BadUrl
 * @extends {Component<{}>}
 */
export class BadUrl extends Component<{}> {

    public constructor(props: {}) {
        super(props);
        this.state = {};
    }
    
    public render(): JSX.Element {
        return (
            <>
                <div style={{
                    margin: "calc(10px + 6vh) 0 calc(10px + 3vh)",
                    padding: "calc(12px + 5vh) calc(20px + 5vw)",
                    // boxShadow: `6px 5px 0 1px ${
                    //     Shared.theme.colortab.border.replace(
                    //         "(", "a("
                    //     ).replace(
                    //         ")", ",0.1)"
                    //     )
                    // }`
                }} >
                    <h1 style={{
                        margin: "calc(20px + 3vh)"
                    }} >
                        404 - Bad Gateway (v3)
                    </h1>
                    <br />
                    <span >
                        Sorry, the URL you required is not valid.
                    </span>
                </div>
            </>
        );
    }

    public componentDidMount(): void {}

};
