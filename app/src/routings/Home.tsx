/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 21:07:40 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-01 01:30:36
 */

import React from "react";
import { PageBody } from "../methods/typedict";
import { Shared } from "../methods/globals";
import { SettingsButton } from "../compo/SettingsButton";
import { InfoView } from "../compo/InfoView";


/**
 * 这个页面级组件渲染对应地址 / .
 * 
 * @export
 * @class Home
 * @extends {PageBody<{}>}
 */
export class Home extends PageBody<{}> {

    public constructor(props: {}) {
        super(props);
        this.state = {};
    }
    
    public render(): JSX.Element {
        return (
            <>
                <InfoView />
                <div style={{
                    color: Shared.theme.colortab.color,
                    margin: "calc(10px + 6vh) calc(20px + 8vw) calc(10px + 3vh)",
                    padding: "calc(12px + 5vh)",
                    border: `1px solid ${ Shared.theme.colortab.border }`,
                    boxShadow: `6px 5px 0 1px ${
                        Shared.theme.colortab.border.replace(
                            "(", "a("
                        ).replace(
                            ")", ",0.1)"
                        )
                    }`
                }} >
                    网站升级中...
                    <br />
                    <br />
                    <span style={{ color: Shared.theme.colortab.frontground }} >
                        Sorry,&nbsp;
                    </span>
                    <span style={{ color: Shared.theme.colortab.frontground2 }} >
                        this website&nbsp;
                    </span>
                    <span style={{ color: Shared.theme.colortab.frontground3 }} >
                        is under&nbsp;
                    </span>
                    <span style={{ color: "rgb(63,119,134)" }} >rebuilding...</span>
                </div>
                <div style={{
                    position: "absolute",
                    left: "12px",
                    top: "12px",
                    pointerEvents: "none"
                }} >
                    <svg width="40px" height="40px" 
                    style={{
                        scale: "144%"
                    }}>
                        <rect key="0"
                        x={ 20 } y={ 20 } width={ 20 } height={ 20 }
                        style={{
                            fill: Shared.theme.colortab.frontground,
                            stroke: Shared.theme.colortab.background,
                            pointerEvents: "all",
                            cursor: "none",
                            transform: "rotate(18deg) translate(-10px,-10px)",
                            transformOrigin: "20px 20px"
                        }}
                        onMouseOver={
                            () => {
                                Shared.cursorState = "pointer";
                            }
                        }
                        onMouseOut={
                            () => {
                                Shared.cursorState = "normal";
                            }
                        } />
                        <rect key="1"
                        x={ 20 } y={ 20 } width={ 16 } height={ 16 }
                        style={{
                            fill: Shared.theme.colortab.frontground2,
                            stroke: Shared.theme.colortab.background,
                            transform: "rotate(36deg) translate(-8px,-8px)",
                            transformOrigin: "20px 20px"
                        }} />
                        <rect key="2"
                        x={ 20 } y={ 20 } width={ 12.8 } height={ 12.8 }
                        style={{
                            fill: Shared.theme.colortab.frontground3,
                            stroke: Shared.theme.colortab.background,
                            transform: "rotate(54deg) translate(-6.4px,-6.4px)",
                            transformOrigin: "20px 20px"
                        }} />
                        <rect key="4"
                        x={ 20 } y={ 20 } width={ 9.8 } height={ 9.8 }
                        style={{
                            fill: Shared.theme.colortab.frontground,
                            stroke: Shared.theme.colortab.background,
                            transform: "rotate(72deg) translate(-4.9px,-4.9px)",
                            transformOrigin: "20px 20px"
                        }} />
                        <rect key="5"
                        x={ 20 } y={ 20 } width={ 7.6 } height={ 7.6 }
                        style={{
                            fill: Shared.theme.colortab.frontground2,
                            stroke: Shared.theme.colortab.background,
                            transform: "rotate(90deg) translate(-3.8px,-3.8px)",
                            transformOrigin: "20px 20px"
                        }} />
                        <rect key="6"
                        x={ 20 } y={ 20 } width={ 6 } height={ 6 }
                        style={{
                            fill: Shared.theme.colortab.frontground3,
                            stroke: Shared.theme.colortab.background,
                            transform: "rotate(108deg) translate(-3px,-3px)",
                            transformOrigin: "20px 20px"
                        }} />
                    </svg>
                </div>
                <SettingsButton />
            </>
        );
    }

    public componentDidMount(): void {
        Shared.cursorState = "normal";
    }

};
