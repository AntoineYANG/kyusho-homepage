/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-01 01:28:18 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-05 15:25:20
 */

import React from "react";
import { Shared } from "../methods/globals";
import Color from "../preference/Color";
import { execCopy } from "../methods/copy";


export const InfoView = (): JSX.Element => {
    return (
        <div style={{
            color: Shared.theme.colortab.color,
            background: 'rgba(0, 0, 0, 0) url("./images/home.png") no-repeat scroll 22% 0% / cover',
            margin: "calc(10px + 8vh) calc(20px + 8vw) calc(10px + 3vh)",
            minHeight: "calc(12vw - 10px)",
            padding: "calc(-20px + 3vh) calc(6px + 1.5vw) calc(-20px + 3vh) 28%",
            fontSize: "calc(8px + 0.6vmax)",
            border: `1px solid ${ Shared.theme.colortab.border }`,
            boxShadow: `6px 5px 0 1px ${
                Shared.theme.colortab.border.replace(
                    "(", "a("
                ).replace(
                    ")", ",0.1)"
                )
            }`
        }} >
            <div key="name" style={{
                maxWidth: "36vw",
                fontSize: "calc(10px + 1vmax)",
                margin: "1em auto 0.6em"
            }} >
                <label key="1" style={{
                    display: "inline-block",
                    margin: "0 auto",
                    cursor: "none"
                }} >
                    { `Zhendong Yang` }
                </label>
                <label key="2" style={{
                    display: "inline-block",
                    margin: "0 auto",
                    padding: "0 0.5em",
                    cursor: "none",
                    opacity: 0.9,
                    fontSize: "90%"
                }} >
                    { `(Kanata You)` }
                </label>
            </div>
            <label key="prof" style={{
                display: "inline-block",
                padding: "0.1em 0.6em",
                margin: "0.2em auto",
                cursor: "none",
                color: Color.setLightness(
                    Shared.theme.colortab.color, 0.1
                ),
                backgroundColor: Color.setLightness(
                    Shared.theme.colortab.color, 0.8
                ).replace(
                    "(", "a("
                ).replace(
                    ")", ",0.3)"
                )
            }} >
                { `Student, China` }
            </label>
            <label key="belong" style={{
                display: "inline-block",
                fontSize: "90%",
                padding: "0.3em 0.6em",
                margin: "0.2em auto 6vh",
                cursor: "none",
                color: Color.setLightness(
                    Shared.theme.colortab.color, 0.1
                ),
                backgroundColor: Color.setLightness(
                    Shared.theme.colortab.color, 0.8
                ).replace(
                    "(", "a("
                ).replace(
                    ")", ",0.3)"
                )
            }} >
                School of Information Management and Artifitial Intelligence,
                Zhejiang University of Finance and Economics
            </label>
            <label key="contact" style={{
                display: "inline-block",
                padding: "0.3em 0.6em 0.1em",
                margin: "0.2em auto 0",
                cursor: "none",
                fontSize: "calc(12px + 0.4vmax)",
                color: Shared.theme.colortab.frontground
            }} >
                Contact Info
            </label>
            <div key="links" style={{
                margin: "1vh auto calc(4vh - 12px)",
                padding: "0.4vh 2vw 0.4vh",
                display: "flex",
                border: "1px solid " + Shared.theme.colortab.frontground3
            }} >
                <div key="github"
                style={{
                    margin: "0 calc(1vw - 4px) 0 auto",
                    padding: "0 2px",
                    display: "flex",
                    alignItems: "center"
                }}
                onMouseEnter={
                    () => {
                        Shared.cursorState = "pointer";
                    }
                }
                onMouseLeave={
                    () => {
                        Shared.cursorState = "normal";
                    }
                } >
                    <a href="https://github.com/AntoineYANG" target="new"
                    style={{
                        cursor: "none"
                    }} >
                        <svg height="28" width="28" viewBox="0 0 16 16" version="1.1"
                        aria-hidden="true"
                        style={{
                            transform: "translateY(1.2px)"
                        }} >
                            <path fillRule="evenodd"
                            d={
                                "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-"
                                + ".17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-"
                                + ".94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-"
                                + ".01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.8"
                                + "7.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2."
                                + "15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.3"
                                + "2-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82"
                                + ".44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.8"
                                + "7 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01"
                                + " 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                            }
                            style={{
                                fill: Shared.theme.colortab.frontground2,
                                pointerEvents: "none"
                            }} />
                        </svg>
                    </a>
                </div>
                <div key="npm"
                style={{
                    margin: "0 calc(1vw - 4px)",
                    padding: "0 2px",
                    display: "flex",
                    alignItems: "center"
                }}
                onMouseEnter={
                    () => {
                        Shared.cursorState = "pointer";
                    }
                }
                onMouseLeave={
                    () => {
                        Shared.cursorState = "normal";
                    }
                } >
                    <a href="https://www.npmjs.com/~kanatayou" target="new"
                    style={{
                        cursor: "none"
                    }} >
                        <svg height="28" width="28" viewBox="0 0 780 250">
                            <path d={
                                "M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z "
                                + "M480,0v200h100V50h50v150h50V50h50v150h50V0H480z "
                                + "M0,200h100V50h50v150h50V0H0V200z"
                            }
                            style={{
                                fill: Shared.theme.colortab.frontground2
                            }} />
                        </svg>
                    </a>
                </div>
                <div key="mail" title="Click to copy"
                style={{
                    margin: "0 calc(1vw - 4px)",
                    padding: "0 2px",
                    display: "flex",
                    alignItems: "center"
                }}
                onMouseEnter={
                    () => {
                        Shared.cursorState = "pointer";
                    }
                }
                onMouseLeave={
                    () => {
                        Shared.cursorState = "normal";
                    }
                } >
                    <svg height="28" width="28" version="1.1"
                    aria-hidden="true"
                    style={{
                        transform: "translateY(1.2px)"
                    }}
                    onClick={
                        () => {
                            execCopy("antoineyang99@gmail.com");
                        }
                    } >
                        <rect
                        x={ 2 } y={ 5 } width={ 24 } height={ 18 }
                        style={{
                            fill: Shared.theme.colortab.color,
                            pointerEvents: "none"
                        }} />
                        <path
                        d="M3,23 L3,6 L14,14 L25,6 L25,23"
                        style={{
                            fill: "none",
                            stroke: Shared.theme.colortab.frontground2,
                            strokeWidth: 2,
                            pointerEvents: "none"
                        }} /> />
                    </svg>
                </div>
                <div key="zhihu"
                style={{
                    margin: "0 auto 0 calc(1vw - 4px)",
                    padding: "0 2px",
                    display: "flex",
                    alignItems: "center"
                }}
                onMouseEnter={
                    () => {
                        Shared.cursorState = "pointer";
                    }
                }
                onMouseLeave={
                    () => {
                        Shared.cursorState = "normal";
                    }
                } >
                    <a href="https://www.zhihu.com/people/bu-yuan-86-22" target="new"
                    style={{
                        cursor: "none"
                    }} >
                        <img src="./images/zhihu.jpeg" alt="知乎" width="28" height="28"
                        onDragStart={ e => e.preventDefault() }
                        style={{
                            transform: "translateY(1.6px)"
                        }} />
                    </a>
                </div>
            </div>
        </div>
    );
};
