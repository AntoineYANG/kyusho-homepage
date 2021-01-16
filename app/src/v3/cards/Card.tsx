/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 15:17:27 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 20:22:21
 */

import React, { Component } from "react";
import { TextV3, Lang } from "../TypesV3";
import { connect } from "react-redux";
import { LangConfig } from "../reducers/LangConfig";
import Design from "../design/design";
import { createStyle } from "reacss";
import { SchemeConfig, ColorScheme } from "../reducers/SchemeConfig";


interface FfTextNodeV3Props {
    text: TextV3;
    lang: Lang;
};

// @ts-ignore
@connect(LangConfig.mapStateToProps)
class FfTextNodeV3 extends Component<FfTextNodeV3Props> {

    public render(): JSX.Element {
        return (
            <>{ this.props.text[this.props.lang] }</>
        );
    }

};

export const TextNodeV3: React.FC<{ children: TextV3; }> = props => (
    // @ts-ignore
    <FfTextNodeV3 text={ props.children } />
);

// @ts-ignore
@connect(LangConfig.mapStateToProps)
export class HTMLNodeV3 extends Component<{ children: TextV3; }> {

    protected ref: React.RefObject<HTMLSpanElement>;

    public constructor(props: { children: TextV3; }) {
        super(props);

        this.ref = React.createRef<HTMLSpanElement>();
    }

    public render(): JSX.Element {
        return (
            <span key={ new Date().getTime() } ref={ this.ref } />
        );
    }

    public componentDidMount(): void {
        if (this.ref.current) {
            // @ts-ignore
            this.ref.current.innerHTML = this.props.children[this.props.lang];
        }
    }

    public componentDidUpdate(): void {
        if (this.ref.current) {
            // @ts-ignore
            this.ref.current.innerHTML = this.props.children[this.props.lang];
        }
    }

};


export interface CardProps {
    style?: React.CSSProperties;
};

const CardSchemeLight = createStyle({
    "div": {
        backgroundColor:    Design.white,
        color:              Design.black,
        boxShadow:          `6px 5px 0 1px ${ Design.black.replace("(", "a(").replace(")", ",0.33)") }`,
        minWidth:           "8vh",
        width:              "80vw",
        maxWidth:           "600px",
        fontSize:           "95%",
        padding:            "6vh 6vw",
        display:            "inline-flex",
        flexDirection:      "column"
    },
    "div header": {
        textAlign:      "left",
        margin:         "1.2em 0 2em",
        borderBottom:   "1px solid black",
        fontSize:       "130%",
        fontWeight:     "bold"
    },
    "div p": {
        textAlign:      "left"
    }
});

const CardSchemeDark = createStyle({
    "div": {
        background:     "rgba(36,24,40,0.4)",
        border:         "1px solid rgb(128,82,119)",
        color:          Design.white,
        minWidth:       "8vh",
        width:          "80vw",
        maxWidth:       "600px",
        fontSize:       "95%",
        padding:        "6vh 6vw",
        display:        "inline-flex",
        flexDirection:  "column"
    },
    "div header": {
        textAlign:      "left",
        margin:         "1.2em 0 2em",
        borderBottom:   "1px solid rgb(140,113,129)",
        fontSize:       "130%",
        fontWeight:     "bold"
    },
    "div p": {
        textAlign:      "left"
    }
});

export const Card: React.FC<CardProps> = props => {
    return (
        <CardFf>
            { props.children }
        </CardFf>
    );
};

// @ts-ignore
@connect(SchemeConfig.mapStateToProps)
class CardFf extends Component<CardProps> {
    public render(): JSX.Element {
        const scheme = (this.props as { scheme: ColorScheme }).scheme;
        const style = scheme === "dark" ? CardSchemeDark : CardSchemeLight;
        
        return (
            <div className={ style.id } style={{
                ...this.props.style
            }} >
                { this.props.children }
            </div>
        );
    }
}
