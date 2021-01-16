/*
 * @Author: Kanata You 
 * @Date: 2020-12-09 18:20:50 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 20:15:53
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { SchemeConfig, ColorScheme } from "../reducers/SchemeConfig";
import Design from "../design/design";


interface FfSchemeOptionProps {
    scheme:     ColorScheme;
    setScheme:  (scheme: ColorScheme) => any;
};

interface FfSchemeOptionState {
    opened: boolean;
};

// @ts-ignore
@connect(SchemeConfig.mapStateToProps, SchemeConfig.mapDispatchToProps)
class FfSchemeOption extends Component<FfSchemeOptionProps, FfSchemeOptionState> {

    public constructor(props: FfSchemeOptionProps) {
        super(props);
        this.state = {
            opened: false
        };
    }

    public render(): JSX.Element {
        return (
            <div>
                <label key="chosen" title="color scheme" tabIndex={ 1 }
                onClick={
                    () => {
                        this.setState({
                            opened: !this.state.opened
                        });
                    }
                } >
                    <span>
                        { this.props.scheme }
                    </span>
                    <svg width="20px" height="20px" viewBox="0 0 10 10" >
                        <path d="M2,5 L5,8 L8,5" />
                    </svg>
                </label>
                {
                    this.state.opened ? (
                        (["light", "dark"] as Array<ColorScheme>).map(d => {
                            return (
                                <label key={ d } className="option" tabIndex={ 1 }
                                style={{
                                    cursor: d !== this.props.scheme ? "pointer" : "default",
                                    color: d === this.props.scheme ? Design.white : undefined
                                }}
                                onClick={
                                    () => {
                                        if (d !== this.props.scheme) {
                                            this.props.setScheme(d);
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

export const SchemeOption: React.FC = _props => {
    return (
        // @ts-ignore
        <FfSchemeOption />
    );
};
