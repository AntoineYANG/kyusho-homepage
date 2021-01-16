/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 16:48:21 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 21:16:34
 */

import React, { useRef, useLayoutEffect, Component } from "react";
import { TextV3 } from "../TypesV3";
import { TextNodeV3 } from "../cards/Card";
import { Link } from "react-router-dom";
import { createStyle } from "reacss";
import { SchemeConfig, ColorScheme } from "../reducers/SchemeConfig";
import { connect } from "react-redux";


export interface LinkButtonProps {
    children: TextV3;
    to: string;
    style?: React.CSSProperties;
    type?: "normal" | "danger";
    handle?: {
        ref?: HTMLAnchorElement | null;
        trigger?: () => void;
    };
};

const LinkButtonStyleLight = createStyle({
    "div": {
        display:        "inline-block",
        fontSize:       "120%",
        textAlign:      "center",
        cursor:         "pointer",
        minWidth:       "2.8em",
        padding:        "0.2em 0.8em",
        background:     "rgb(251,250,238)",
        color:          "rgb(82,223,129)",
        border:         "1px solid rgb(82,223,129)",
        transition:     "color 0.6s, background 0.6s"
    },
    "div:hover": {
        background: 'rgb(82,223,129)',
        color:      'rgb(60,83,80)'
    },
    "div.danger": {
        cursor:     "not-allowed",
        background: "rgb(92,38,46)",
        color:      "rgb(244,71,71)",
        border:     "1px solid rgb(244,71,71)"
    },
    "div.danger:hover": {
        background: 'rgb(244,71,71)',
        color:      'rgb(238,238,238)'
    }
});

const LinkButtonStyleDark = createStyle({
    "div": {
        display:        "inline-block",
        fontSize:       "120%",
        textAlign:      "center",
        cursor:         "pointer",
        minWidth:       "2.8em",
        padding:        "0.2em 0.8em",
        background:     "rgb(31,22,38)",
        color:          "rgb(167,89,156)",
        border:         "1px solid rgb(167,89,156)",
        transition:     "color 0.6s, background 0.6s"
    },
    "div:hover": {
        background: 'rgb(167,89,156)',
        color:      'rgb(15,18,44)'
    },
    "div.danger": {
        cursor:     "not-allowed",
        background: "rgb(92,38,46)",
        color:      "rgb(244,71,71)",
        border:     "1px solid rgb(244,71,71)"
    },
    "div.danger:hover": {
        background: 'rgb(244,71,71)',
        color:      'rgb(238,238,238)'
    }
});

// @ts-ignore
@connect(SchemeConfig.mapStateToProps)
class LinkButtonFf extends Component<LinkButtonProps> {
    public render(): JSX.Element {
        const scheme = (this.props as any as { scheme: ColorScheme }).scheme;
        const style = scheme === "dark" ? LinkButtonStyleDark : LinkButtonStyleLight;

        return (
            <div className={ style.id + (this.props.type === "danger" ? " danger" : "") }
            style={{ ...this.props.style }} >
                <TextNodeV3>{ this.props.children }</TextNodeV3>
            </div>
        );
    }
}

export const LinkButton: React.FC<LinkButtonProps> = props => {
    const ref = useRef() as React.RefObject<HTMLAnchorElement>;

    useLayoutEffect(() => {
        if (props.handle) {
            props.handle.trigger = () => {
                ref.current?.click();
            };
            props.handle.ref = ref.current;
        }
    }, [props, ref]);

    return (
        <Link to={ props.to } ref={ ref } >
            <LinkButtonFf { ...props } >
                { props.children }
            </LinkButtonFf>
        </Link>
    );
};
