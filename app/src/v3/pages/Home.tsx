/*
 * @Author: Kanata You 
 * @Date: 2020-12-02 20:44:30 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-06 18:09:27
 */

import React, { Component } from "react";
import { PageFlow } from "../containers/PageFlow";
import { WelcomeCard } from "../cards/WelcomeCard";


/**
 * 这个页面级组件渲染对应地址 / .
 * 
 * @export
 * @class Home
 * @extends {Component<{}, {}>}
 */
export class Home extends Component {

    public constructor(props: {}) {
        super(props);
        this.state = {};
    }
    
    public render(): JSX.Element {
        return (
            <>
                <PageFlow height="88vh" >
                    <WelcomeCard />
                    <div key="1"
                    style={{
                        background: "white",
                        padding: "10vh 10vw",
                        display: "inline-block",
                        fontSize: "160%"
                    }} >
                        <p>
                            <label>
                                This page is not released yet,&nbsp;
                            </label>
                        </p>
                        <p>
                            <a href="/v2" style={{
                                color: "rgb(255,215,61)"
                            }} >
                                click here to move back to v2.x
                            </a>
                        </p>
                    </div>
                    <div key="2" style={{ background: "white", padding: "10vh 10vw", display: "inline-block" }} >b</div>
                    <div key="3" style={{ background: "white", padding: "50vh 10vw", display: "inline-block" }} >c</div>
                    <div key="4" style={{ background: "white", padding: "10vh 10vw", display: "inline-block" }} >d</div>
                </PageFlow>
            </>
        );
    }

    public componentDidMount(): void {}

};

