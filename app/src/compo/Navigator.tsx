/*
 * @Author: Kanata You 
 * @Date: 2020-09-09 18:37:14 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-09 22:05:49
 */

import React from "react";
import $ from "jquery";
import { Shared } from "../methods/globals";
import Color from "../preference/Color";


export const Navigator = (props: { children?: any }): JSX.Element => {
    let display: boolean = true;
    let timers: Array<NodeJS.Timeout> = [];
    let width: number = 0;

    return (
        <div className="navi"
        style={{
            position: "fixed",
            top: "20vh",
            fontSize: "calc(14px + 0.5vw)",
            backgroundColor: Color.interpolate(
                Shared.theme.colortab.background,
                Shared.theme.colortab.base,
                0.7
            ),
            color: Shared.theme.colortab.color,
            display: "flex",
            alignItems: "stretch",
            zIndex: 9999
        }} >
            <div key="menu"
            style={{
                minWidth: "calc(64px + 1.5vw)",
                padding: "8px 0",
                fontSize: "calc(14px + 0.5vw)",
                backgroundColor: Color.interpolate(
                    Shared.theme.colortab.background,
                    Shared.theme.colortab.base,
                    0.7
                ),
                color: Shared.theme.colortab.color,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden"
            }} >
                { props.children }
            </div>
            <div key="switch"
            style={{
                padding: "8px 6px",
                fontSize: "calc(14px + 0.5vw)",
                backgroundColor: Color.interpolate(
                    Shared.theme.colortab.background,
                    Shared.theme.colortab.base,
                    0.6
                ),
                color: Shared.theme.colortab.color,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center"
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
            }
            onClick={
                e => {
                    timers.forEach(timer => {
                        clearTimeout(timer);
                    });
                    timers = [];

                    const element = e.currentTarget;
                    const sibling: Element = element.previousElementSibling!;
                    const child: JQuery<HTMLElement> = $(element).children("label");

                    if (display) {
                        width = sibling.clientWidth;
                        
                        for (let ol: number = width, t: number = 1; true; ol-=2, t++) {
                            const w: number = ol;

                            timers.push(
                                setTimeout(() => {
                                    $(sibling).css(
                                        "min-width", `${ Math.max(w, 0) }px`
                                    ).css(
                                        "max-width", `${ Math.max(w, 0) }px`
                                    );
                                }, 2 * t)
                            );

                            if (ol < 0) {
                                break;
                            }
                        }
                        
                        child.text("❱");
                    } else {
                        for (let ol: number = 0, t: number = 1; true; ol+=2, t++) {
                            const w: number = ol;
                            const W: number = width;

                            timers.push(
                                setTimeout(() => {
                                    $(sibling).css(
                                        "min-width", `${
                                            w > W ? "calc(64px + 1.5vw)" : `${ w }px`
                                        }`
                                    ).css(
                                        "max-width", `${
                                            w > W ? "unset" : `${ w }px`
                                        }`
                                    );
                                }, 2 * t)
                            );

                            if (ol > W) {
                                break;
                            }
                        }
                        
                        child.text("❰");
                    }
                    display = !display;
                }
            } >
                <label
                style={{
                    cursor: "none",
                    color: Shared.theme.colortab.color,
                    pointerEvents: "all",
                    transform: "translateY(-50%)",
                    position: "relative",
                    top: "50%"
                }} >
                    { display ? "❰" : "❱" }
                </label>
            </div>
        </div>
    );
};
