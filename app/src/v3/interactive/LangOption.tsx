/*
 * @Author: Kanata You 
 * @Date: 2020-12-09 18:20:50 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-10 16:57:07
 */

import React, { Component } from "react";
import { Lang } from "../TypesV3";
import { connect } from "react-redux";
import { LangConfig } from "../reducers/LangConfig";
import Design from "../design/design";


interface FfLangOptionProps {
    lang: Lang;
    setLang: (lang: Lang) => any;
};

interface FfLangOptionState {
    opened: boolean;
};

// @ts-ignore
@connect(LangConfig.mapStateToProps, LangConfig.mapDispatchToProps)
class FfLangOption extends Component<FfLangOptionProps, FfLangOptionState> {

    public constructor(props: FfLangOptionProps) {
        super(props);
        this.state = {
            opened: false
        };
    }

    public render(): JSX.Element {
        return (
            <div
            style={{
                position: "fixed",
                top: "0",
                right: "0",
                margin: "2vh 18px",
                width: "48px",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "flex-start",
                zIndex: 100
            }} >
                <label key="chosen" className="LangOption" tabIndex={ 1 }
                style={{
                    height: "1em",
                    padding: "0.2em 3px",
                    cursor: "pointer",
                    border: `1px solid ${ Design.white }`,
                    borderRadius: "0.6em",
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "center"
                }}
                onClick={
                    () => {
                        this.setState({
                            opened: !this.state.opened
                        });
                    }
                } >
                    <span style={{
                        flex: 1,
                        pointerEvents: "none"
                    }} >
                        { this.props.lang }
                    </span>
                    <svg width="16px" height="16px" viewBox="0 0 10 10"
                    style={{
                        pointerEvents: "none"
                    }} >
                        <path d="M3,5 L5,7 L7,5"
                        style={{
                            fill: "none"
                        }} />
                    </svg>
                </label>
                {
                    this.state.opened ? (
                        (["CH", "JP", "EN"] as Array<Lang>).map(d => {
                            return (
                                <label key={ d } className="option" tabIndex={ 1 }
                                style={{
                                    height: "1em",
                                    padding: "0.2em 3px",
                                    cursor: d !== this.props.lang ? "pointer" : undefined,
                                    background: Design.black,
                                    display: "flex",
                                    alignItems: "stretch",
                                    justifyContent: "center",
                                    color: d === this.props.lang ? Design.white : undefined
                                }}
                                onClick={
                                    () => {
                                        if (d !== this.props.lang) {
                                            this.props.setLang(d);
                                        }
                                        this.setState({
                                            opened: false
                                        });
                                    }
                                } >
                                    { d }
                                </label>
                            );
                        })
                    ) : null
                }
            </div>
        );
    }

};

export const LangOption: React.FC = _props => {
    return (
        // @ts-ignore
        <FfLangOption />
    );
};
