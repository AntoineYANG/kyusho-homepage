/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 15:17:27 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-10 20:09:02
 */

import React, { Component } from "react";
import { TextV3, Lang } from "../TypesV3";
import { connect } from "react-redux";
import { LangConfig } from "../reducers/LangConfig";
import Design from "../design/design";


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

export const Card: React.FC<CardProps> = props => {
    return (
        <div className="card" style={{
            backgroundColor: Design.white,
            color: Design.black,
            boxShadow: `6px 5px 0 1px ${ Design.black.replace("(", "a(").replace(")", ",0.33)") }`,
            ...props.style
        }} >
            { props.children }
        </div>
    );
};
