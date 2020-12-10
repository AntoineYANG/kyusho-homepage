/*
 * @Author: Kanata You 
 * @Date: 2020-12-09 10:35:25 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-10 19:54:29
 */

import React, { Component } from "react";
import Design, { Fonts } from "../design/design";
import { TextV3, Lang } from "../TypesV3";
import { TextNodeV3 } from "./Card";
import Color from "../../v2/preference/Color";
import { connect } from "react-redux";
import { LangConfig } from "../reducers/LangConfig";


interface DisplayCardContainerProps {
    style?: React.CSSProperties;
    title: TextV3;
    lang: Lang;
};

// @ts-ignore
@connect(LangConfig.mapStateToProps)
class DisplayCardContainer extends Component<DisplayCardContainerProps> {

    public render(): JSX.Element {
        return (
            <div className="DisplayCardContainer" lang={ this.props.lang.toLocaleLowerCase() } >
                <div className="card DisplayCard" style={{
                    color: Design.gold,
                    boxShadow: `6px 5px 0 1px ${ Design.black.replace("(", "a(").replace(")", ",0.33)") }`,
                    ...this.props.style
                }} >
                    <div className="DisplayCardContent" key="header"
                    style={{
                        backgroundColor: Design.black,
                        color: Design.gold,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        fontFamily: Fonts[this.props.lang] || "inherit"
                    }} >
                        <header>
                            <span key={ new Date().getTime() }
                            // 这里设置一个 key 保证每次文本都会更新
                            style={{
                                borderBottom: `1px solid ${ Design.gold }`,
                                borderImage: `linear-gradient(${ Design.gold }, ${ Design.black }) 30 30 stretch`,
                                textShadow: `1.6px 1.2px 2px ${ Color.setLightness(Design.gold, 0.33) }`
                            }} >
                                <TextNodeV3>
                                    { this.props.title }
                                </TextNodeV3>
                            </span>
                        </header>
                        <div key="content" style={{
                            // minHeight: "50vh",
                            display: "flex",
                            padding: "1vh 10px 2vh",
                            overflowX: "hidden",
                            flexWrap: "wrap",
                            alignItems: "center"
                        }} >
                            { this.props.children }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export interface DisplayCardProps {
    style?: React.CSSProperties;
    title: TextV3;
};

export const DisplayCard: React.FC<DisplayCardProps> = props => {
    return (
        // @ts-ignore
        <DisplayCardContainer style={ props.style } title={ props.title } children={ props.children } />
    );
};
