/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-30 22:42:24 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-01 23:07:25
 */

import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { Shared } from "../methods/globals";


export interface HomeButtonProps {
    active: boolean;
};

export const HomeButton = (props: HomeButtonProps): JSX.Element => {
    const svg: JSX.Element = (
        <svg width="40px" height="40px"
        style={{
            scale: "144%"
        }} >
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
    );

    return (
        <div style={{
            position: "absolute",
            left: "12px",
            top: "12px",
            pointerEvents: "none"
        }} >
        {
            props.active ? (
                <HashRouter>
                    <Link to="/" >
                        <div style={{
                            position: "absolute",
                            left: "12px",
                            top: "12px",
                            pointerEvents: "none"
                        }} >
                            { svg }
                        </div>
                    </Link>
                </HashRouter>
            ) : (
                <div style={{
                    position: "absolute",
                    left: "12px",
                    top: "12px",
                    pointerEvents: "none"
                }} >
                    { svg }
                </div>
            )
        }
        </div>
    );
};
