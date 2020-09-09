/*
 * @Author: Kanata You 
 * @Date: 2020-09-09 22:08:47 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-09 22:20:29
 */

import React from "react";
import $ from "jquery";
import { Shared } from "../methods/globals";


export const ScrollTop = (props: {}): JSX.Element => {
    return (
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            cursor: "none",
            padding: "8px 24px",
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
        }
        onClick={
            () => {
                $(window).scrollTop(0);
            }
        } >
            <svg viewBox="0 0 40 40"
            style={{
                width: "calc(14px + 1vw)",
                height: "calc(14px + 1vw)"
            }} >
                <path d={
                    "M14,38 L14,20 L4,20 L20,2 L36,20 L26,20 L26,38 Z"
                }
                style={{
                    fill: Shared.theme.colortab.color,
                    pointerEvents: "all",
                    cursor: "none"
                }} />
            </svg>
        </div>
    );
};
