/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-30 22:42:24 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-09 22:07:10
 */

import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { Shared } from "../methods/globals";


export interface HomeButtonProps {
    active: boolean;
};

export const HomeButton = (props: HomeButtonProps): JSX.Element => {
    const svg: JSX.Element = (
        <label
        style={{
            letterSpacing: "0.1em",
            cursor: "none",
            color: Shared.theme.colortab.color,
            pointerEvents: "all",
            width: "calc(48px + 1.5vw)",
            padding: "calc(5px + 0.2vw) 12px",
            margin: "0 12px"
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
            HOME
        </label>
    );

    return props.active ? (
        <HashRouter>
            <Link to="/"
            style={{
                textDecoration: "none",
                display: "flex",
                cursor: "none"
            }} >
                { svg }
            </Link>
        </HashRouter>
    ) : (
        <>
            { svg }
        </>
    );
};
