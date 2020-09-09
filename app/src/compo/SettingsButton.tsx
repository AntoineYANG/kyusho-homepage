/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-29 21:17:55 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-09 21:47:17
 */

import React, { Component } from "react";
import { HashRouter, Link } from "react-router-dom";
import { Shared } from "../methods/globals";
import Color from "../preference/Color";


export class SettingsButton extends Component<{}, {}> {

    public constructor(props: {}) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <HashRouter>
                <Link to="/settings"
                style={{
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center",
                    cursor: "none",
                    padding: "8px 0",
                    margin: "0 12px 0 8px"
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
                } >
                    <svg viewBox="4 4 32 32"
                    style={{
                        width: "calc(12px + 1vw)",
                        height: "calc(12px + 1vw)"
                    }} >
                        <path d={
                            "M32,22 A16.5,16.5,0,0,0,32,18 L29,18 A13.5,13.5,0,0,0,28,15"
                            + " L30,13 A16.5,16.5,0,0,0,27,10 L25,12 A13.5,13.5,0,0,0,22,11"
                            + " L22,8 A16.5,16.5,0,0,0,18,8 L18,11 A13.5,13.5,0,0,0,15,12"
                            + " L13,10 A16.5,16.5,0,0,0,10,13 L12,15 A13.5,13.5,0,0,0,11,18"
                            + " L8,18 A16.5,16.5,0,0,0,8,22 L11,22 A13.5,13.5,0,0,0,12,25"
                            + " L10,27 A16.5,16.5,0,0,0,13,30 L15,28 A13.5,13.5,0,0,0,18,29"
                            + " L18,32 A16.5,16.5,0,0,0,22,32 L22,29 A13.5,13.5,0,0,0,25,28"
                            + " L27,30 A16.5,16.5,0,0,0,30,27 L28,25 A13.5,13.5,0,0,0,29,22"
                        }
                        style={{
                            fill: Shared.theme.colortab.color,
                            pointerEvents: "all",
                            cursor: "none"
                        }} />
                        <circle
                        cx={ 20 } cy={ 20 } r={ 5.6 }
                        style={{
                            fill: Color.interpolate(
                                Shared.theme.colortab.background,
                                Shared.theme.colortab.base,
                                0.7
                            )
                        }} />
                    </svg>
                    <label
                    style={{
                        letterSpacing: "-0.05em",
                        fontSize: "90%",
                        cursor: "none",
                        color: Shared.theme.colortab.color,
                        pointerEvents: "all",
                        width: "calc(48px + 1.5vw)",
                        padding: "0 4px"
                    }} >
                        settings
                    </label>
                </Link>
            </HashRouter>
        );
    }

};
