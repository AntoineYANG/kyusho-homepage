/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-31 17:13:33 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-31 18:20:07
 */

import React, { Component } from "react";
import Color from "../preference/Color";
import { Shared } from "../methods/globals";


export interface SubmitButtonProps {
    width: number | string;
    height: number | string;
    text: number | string;
    onClick: (e: SubmitButtonState) => void;
    animation?: {
        preAni: number;
        aftAni: number;
        cooldown: number;
    };
};

export interface SubmitButtonState {
    active: boolean;
    text: number | string;
};


/**
 * 主题按键.
 *
 * @export
 * @class SubmitButton
 * @extends {Component<SubmitButtonProps, SubmitButtonState>}
 */
export class SubmitButton extends Component<SubmitButtonProps, SubmitButtonState> {

    protected waiting: boolean;

    protected animation: {
        preAni: number;
        aftAni: number;
        cooldown: number;
    };

    protected timers: Array<NodeJS.Timeout>;

    public constructor(props: SubmitButtonProps) {
        super(props);
        this.state = {
            active: true,
            text: this.props.text
        };

        this.animation = {
            preAni: this.props.animation?.preAni || 40,
            aftAni: this.props.animation?.aftAni || 240,
            cooldown: this.props.animation?.cooldown || 120
        };

        this.waiting = false;

        this.timers = [];
    }

    public render(): JSX.Element {
        return (
            <div style={{
                display: "inline-flex",
                alignItems: "center",
                width: this.props.width,
                height: this.props.height,
                borderRadius: "4px",
                color: Color.setLightness(
                    Shared.theme.colortab.background,
                    0.2
                ),
                backgroundColor: Color.setLightness(
                    Shared.theme.colortab.background,
                    0.5
                ),
                border: "2px solid " + Shared.theme.colortab.frontground2,
                userSelect: "none"
            }}
            onClick={
                e => {
                    if (this.waiting) {
                        return;
                    }
                    this.waiting = true;

                    const target: EventTarget & HTMLDivElement = e.currentTarget;
                    const span: number = Math.floor(1000 / Shared.animationFPS);

                    // 前
                    for (let t: number = span; t <= this.animation.preAni; t += span) {
                        this.timers.push(
                            setTimeout(() => {
                                target.style.backgroundColor = Color.setLightness(
                                    Shared.theme.colortab.background,
                                    0.5 - 0.4 * t / this.animation.preAni
                                );
                            }, t)
                        );
                    }

                    // 触发
                    this.timers.push(
                        setTimeout(() => {
                            this.props.onClick(this.state);
                        }, this.animation.preAni)
                    );

                    // 后
                    for (let t: number = span; t <= this.animation.aftAni; t += span) {
                        this.timers.push(
                            setTimeout(() => {
                                target.style.backgroundColor = Color.setLightness(
                                    Shared.theme.colortab.background,
                                    0.1 + 0.4 * t / this.animation.aftAni
                                );
                            }, this.animation.preAni + t)
                        );
                    }
                    this.timers.push(
                        setTimeout(() => {
                            target.style.backgroundColor = Color.setLightness(
                                Shared.theme.colortab.background,
                                0.5
                            );
                            this.timers.push(
                                setTimeout(() => {
                                    this.waiting = false;
                                    this.timers = [];
                                }, (
                                    this.animation.cooldown
                                ))
                            );
                        }, this.animation.preAni + this.animation.aftAni)
                    );
                }
            }
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
                <label style={{
                    cursor: "none",
                    display: "block",
                    margin: "0 auto",
                    fontWeight: "bold",
                    letterSpacing: "-0.02em",
                    wordSpacing: "-0.2em",
                    pointerEvents: "none"
                }} >
                    { this.state.text }
                </label>
            </div>
        );
    }

    public componentWillUnmount(): void {
        this.timers.forEach(timer => {
            clearTimeout(timer);
        })
    }

};
