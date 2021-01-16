/*
 * @Author: Kanata You 
 * @Date: 2021-01-16 17:11:10 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 19:46:02
 */

import React, { Component } from "react";
import { LangOption } from "../interactive/LangOption";
import { createStyle, StyledWrapperCC } from "reacss";
import Design from "../design/design";
import { ColorScheme, SchemeConfig } from "../reducers/SchemeConfig";
import { connect } from "react-redux";
import { SchemeOption } from "../interactive/SchemeOption";


const OptionMenuSchemeLight = createStyle({
    "div": {
        position:       "fixed",
        top:            "2vh",
        right:          "6px",
        minWidth:       "16vw",
        width:          "min-content",
        maxWidth:       "20vw",
        filter:         "drop-shadow(1px 1px 2.4px black)",
        display:        "flex",
        flexWrap:       "wrap-reverse",
        alignItems:     "flex-end",
        justifyContent: "space-around",
        zIndex:         100
    },
    "div > div": {
        margin:         "6px 0",
        width:          "80px",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "stretch",
        justifyContent: "flex-start"
    },
    "div > div > label": {
        padding:        "0.1rem 0.4rem",
        cursor:         "pointer",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        outline:        "none"
    },
    "div > div > label:first-child": {
        border:         `1px solid ${ Design.white }`,
        borderRadius:   "0.4rem",
        color:          "rgb(246,246,246)",
        transition:     "color 0.2s"
    },
    "div > div > label:first-child:hover": {
        color:          "rgb(24,31,40)",
        backgroundColor:"rgb(246,246,246)"
    },
    "div > div > label:first-child~label": {
        background:     Design.black,
        color:          "rgb(180,195,202)",
        transition:     "color 0.2s"
    },
    "div > div > label:first-child~label:hover": {
        color:          "rgb(249,225,161)"
    },
    "div > div > label > span": {
        display:        "inline-block",
        width:          "3rem",
        flex:           1,
        pointerEvents:  "none"
    },
    "div > div > label > svg": {
        pointerEvents:  "none"
    },
    "div > div > label > svg > path": {
        fill:           "none",
        stroke:         "rgb(246,246,246)",
        transition:     "stroke 2s"
    },
    "div > div > label:hover > svg > path": {
        stroke:         "rgb(24,31,40)"
    }
});

const OptionMenuSchemeDark = OptionMenuSchemeLight;

// @ts-ignore
@connect(SchemeConfig.mapStateToProps)
// @ts-ignore
export class OptionMenu extends Component {
    public render(): JSX.Element {
        const scheme: ColorScheme = (this.props as { scheme: ColorScheme }).scheme;
        const style = scheme === "dark" ? OptionMenuSchemeDark : OptionMenuSchemeLight;

        return (
            <StyledWrapperCC { ...style } >
                <div>
                    <SchemeOption />
                    <LangOption />
                </div>
            </StyledWrapperCC>
        );
    }
}
