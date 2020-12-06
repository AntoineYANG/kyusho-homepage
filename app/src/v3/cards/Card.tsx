/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 15:17:27 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-06 18:25:58
 */

import React, { Component } from "react";
import { TextV3, Lang } from "../TypesV3";
import { connect } from "react-redux";
import { LangConfig } from "../reducers/LangConfig";


interface FfTextNodeV3Props {
    text: TextV3;
    lang: Lang;
    setLang: (lang: Lang) => any;
};

// @ts-ignore
@connect(LangConfig.mapStateToProps, LangConfig.mapDispatchToProps)
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

export class HTMLNodeV3 extends Component<{ children: TextV3; }> {

    protected ref: React.RefObject<HTMLSpanElement>;

    public constructor(props: { children: TextV3; }) {
        super(props);

        this.ref = React.createRef<HTMLSpanElement>();
    }

    public render(): JSX.Element {
        return (
            <span ref={ this.ref } >
                <TextNodeV3>
                    { this.props.children }
                </TextNodeV3>
            </span>
        );
    }

    public componentDidMount(): void {
        if (this.ref.current) {
            this.ref.current.outerHTML = this.ref.current.innerText;
        }
    }

};


export interface CardProps {
    style?: React.CSSProperties;
};

export const Card: React.FC<CardProps> = props => {
    return (
        <div className="card" style={{ ...props.style }} >
            { props.children }
        </div>
    );
};
