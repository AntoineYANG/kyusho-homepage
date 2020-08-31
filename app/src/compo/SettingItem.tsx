/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-29 21:47:03 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-31 17:06:33
 */

import React, { Component } from "react";
import $ from "jquery";
import { Shared } from "../methods/globals";
import Color from "../preference/Color";


export interface SettingItemProps {
    name: string;
    valueChanged: (value: any) => void;
};

export interface SettingItemState {};

/**
 * 这个组件用来作为设置页面中的单个选项.
 *
 * @export
 * @class SettingItem
 * @extends {Component<P, S>}
 * @template P
 * @template S
 */
export class SettingItem<P extends SettingItemProps, S extends SettingItemState> extends Component<P, S> {

    public constructor(props: P) {
        super(props);
    }

};


export interface SettingValueBarProps extends SettingItemProps {
    min: number;
    max: number;
    setter: (val: number) => number;
    formatter: (val: number) => (string | number);
    default: number;
    valueChanged: (value: number) => void;
    previewChanging: (value: number) => void;
};

export interface SettingValueBarState extends SettingItemState {
    value: number;
};

/**
 * 数字类型的拖动条.
 *
 * @export
 * @class SettingValueBar
 * @extends {SettingItem<SettingValueBarProps, SettingValueBarState>}
 */
export class SettingValueBar extends SettingItem<SettingValueBarProps, SettingValueBarState> {

    protected svg: React.RefObject<SVGSVGElement>;
    protected resizeListener: () => void;

    protected dragging: boolean;
    protected curVal: number;

    public constructor(props: SettingValueBarProps) {
        super(props);
        this.state = {
            value: this.props.default
        };

        this.svg = React.createRef<SVGSVGElement>();
        this.resizeListener = this.resize.bind(this);

        this.dragging = false;
        this.curVal = this.props.default;
    }

    public render(): JSX.Element {
        return (
            <div style={{
                display: "inline-flex",
                margin: "2vh 2vw",
                fontSize: "105%",
                alignItems: "center"
            }} >
                <label style={{
                    cursor: "none",
                    display: "inline-block",
                    width: "20vw",
                    maxWidth: "260px",
                    marginLeft: "auto",
                    marginRight: "calc(4px + 0.1vw)",
                    wordBreak: "break-all",
                    wordWrap: "break-word"
                }} >
                    { this.props.name }
                </label>
                <svg ref={ this.svg } height="40px" style={{
                    maxWidth: "68vw",
                    minWidth: "34vw",
                    marginRight: "auto"
                }} >
                    <rect key="background" className="background"
                    x={ 0 } y={ 15 } width={ 40 } height={ 10 }
                    rx={ 4 } ry={ 4 }
                    style={{
                        fill: Color.setLightness(
                            Shared.theme.colortab.background, 0.2
                        ),
                        stroke: Color.setLightness(
                            Shared.theme.colortab.background, 0.8
                        ),
                        strokeWidth: 2,
                        pointerEvents: "none"
                    }} />
                    <rect key="target" className="target"
                    x={ 0 } y={ 20 } width={ 22 } height={ 22 }
                    rx={ 4 } ry={ 4 }
                    style={{
                        fill: Color.setLightness(
                            Shared.theme.colortab.frontground,
                            0.88
                        ),
                        fillOpacity: 0.8,
                        stroke: Shared.theme.colortab.frontground2,
                        strokeWidth: 4,
                        transform: "translate(-11px,-11px)"
                    }}
                    onMouseOver={
                        e => {
                            Shared.cursorState = "pointer";
                            e.currentTarget.style.fillOpacity = "1.0";
                        }
                    }
                    onMouseOut={
                        e => {
                            Shared.cursorState = "normal";
                            e.currentTarget.style.fillOpacity = "0.8";
                        }
                    }
                    onMouseDown={
                        ev => {
                            this.dragging = true;

                            const target: EventTarget = ev.target;
                            const w: number = $(target).parent("svg").width()!;
                            const x1: number = 4 + 0.05 * w;
                            const x2: number = 0.7 * w - 16;
                            const offset: number = $(target).parent("svg").offset()?.left || 0;

                            const mouseMoveListener = (e: MouseEvent) => {
                                const x: number = Math.max(
                                    x1, Math.min(
                                        x2, e.clientX - offset
                                    )
                                );
                                this.curVal = this.props.min + (x - x1) / (x2 - x1) * (
                                    this.props.max - this.props.min
                                );
                                $(target).attr(
                                    "x", x
                                );
                                const val: number = this.props.setter(this.curVal);
                                $(target).parent("svg").children("text").css(
                                    "fill", Shared.theme.colortab.frontground
                                ).text(
                                    this.props.formatter(val)
                                );
                                this.props.previewChanging(val);
                            };

                            const mouseUpListener = () => {
                                this.dragging = false;
                                $(target).parent("svg").children("text").css(
                                    "fill", Shared.theme.colortab.border
                                );
                                const val: number = this.props.setter(this.curVal);
                                if (val !== this.state.value) {
                                    this.props.valueChanged(val);
                                    this.setState({
                                        value: val
                                    })
                                }

                                document.body.removeEventListener(
                                    "mousemove", mouseMoveListener
                                );
                                document.body.removeEventListener(
                                    "mouseup", mouseUpListener
                                );
                            };

                            document.body.addEventListener(
                                "mousemove", mouseMoveListener
                            );
                            document.body.addEventListener(
                                "mouseup", mouseUpListener
                            );
                        }
                    }
                    onTouchMove={
                        async e => {
                            if (e.touches[0]) {
                                const w: number = $(
                                    e.currentTarget.parentElement!
                                ).width()!;
                                const x1: number = 4 + 0.05 * w;
                                const x2: number = 0.7 * w - 16;
                                const x: number = Math.max(
                                    x1, Math.min(
                                        x2, e.touches[0].clientX - (
                                            e.currentTarget.parentElement!.getBoundingClientRect().left
                                        )
                                    )
                                );
                                this.curVal = this.props.min + (x - x1) / (x2 - x1) * (
                                    this.props.max - this.props.min
                                );
                                $(e.currentTarget.parentElement!).children("rect.target").attr(
                                    "x", x
                                );
                                const val: number = this.props.setter(this.curVal);
                                $(e.currentTarget.parentElement!).children("text").text(
                                    this.props.formatter(val)
                                );
                                if (val !== this.state.value) {
                                    this.props.valueChanged(val);
                                    this.setState({
                                        value: val
                                    })
                                }
                            }
                        }
                    } />
                    <text x={ 100 } y={ 20 } textAnchor="middle"
                    style={{
                        fill: Shared.theme.colortab.border,
                        transform: "translate(-0.5em,0.2em)"
                    }} >
                        { this.props.formatter(this.state.value) }
                    </text>
                </svg>
            </div>
        );
    }

    protected resize(): void {
        const svg: JQuery<SVGSVGElement> = $(this.svg.current!);

        const w: number = svg.width()!;

        const background: JQuery<SVGRectElement> = svg.children("rect.background") as unknown as JQuery<SVGRectElement>;
        const target: JQuery<SVGRectElement> = svg.children("rect.target") as unknown as JQuery<SVGRectElement>;
        const text: JQuery<SVGTextElement> = svg.children("text") as unknown as JQuery<SVGTextElement>;

        const x1: number = 4 + 0.05 * w;
        const x2: number = 0.7 * w - 16;

        background.attr("x", x1).attr("width", x2 - x1);
        target.attr(
            "x", (
                this.state.value - this.props.min
            ) / (
                this.props.max - this.props.min
            ) * (x2 - x1) + x1
        );
        text.attr("x", x2 + (w - x2) / 2);
    }

    public componentDidMount(): void {
        this.resize();
        $(window).on("resize", this.resizeListener);
    }

    public componentWillUnmount(): void {
        $(window).off("resize", this.resizeListener);
    }

    public componentDidUpdate(): void {
        this.curVal = this.props.default;
        this.dragging = false;
        this.resize();
    }

};

export interface SettingRadioProps extends SettingItemProps {
    formatter: (val: boolean) => (string | number);
    default: boolean;
    valueChanged: (value: boolean) => void;
};

export interface SettingRadioState extends SettingItemState {
    value: boolean;
};

/**
 * 单选框.
 *
 * @export
 * @class SettingRadio
 * @extends {SettingItem<SettingRadioProps, SettingRadioState>}
 */
export class SettingRadio extends SettingItem<SettingRadioProps, SettingRadioState> {

    protected svg: React.RefObject<SVGSVGElement>;
    protected resizeListener: () => void;

    public constructor(props: SettingRadioProps) {
        super(props);
        this.state = {
            value: this.props.default
        };

        this.svg = React.createRef<SVGSVGElement>();
        this.resizeListener = this.resize.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div style={{
                display: "inline-flex",
                margin: "2vh 2vw",
                fontSize: "105%",
                alignItems: "center"
            }} >
                <label style={{
                    cursor: "none",
                    display: "inline-block",
                    width: "20vw",
                    maxWidth: "260px",
                    marginLeft: "auto",
                    marginRight: "calc(4px + 0.1vw)",
                    wordBreak: "break-all",
                    wordWrap: "break-word"
                }} >
                    { this.props.name }
                </label>
                <svg ref={ this.svg } height="40px" style={{
                    maxWidth: "68vw",
                    minWidth: "34vw",
                    marginRight: "auto"
                }} >
                    <rect key="background" className="background"
                    x={ 0 } y={ 6 } width={ 28 } height={ 28 }
                    rx={ 6 } ry={ 6 }
                    style={{
                        fill: Color.setLightness(
                            Shared.theme.colortab.background, 0.2
                        ),
                        stroke: Color.setLightness(
                            Shared.theme.colortab.background, 0.8
                        ),
                        strokeWidth: 3
                    }}
                    onMouseOver={
                        e => {
                            Shared.cursorState = "pointer";
                            e.currentTarget.style.fill = Color.setLightness(
                                Shared.theme.colortab.background, 0.08
                            );
                        }
                    }
                    onMouseOut={
                        e => {
                            Shared.cursorState = "normal";
                            e.currentTarget.style.fill = Color.setLightness(
                                Shared.theme.colortab.background, 0.2
                            );
                        }
                    }
                    onClick={
                        () => {
                            const val: boolean = !this.state.value;
                            this.props.valueChanged(val);
                            this.setState({
                                value: val
                            });
                        }
                    } />
                    <circle key="target" className="target"
                    cx={ 20 } cy={ 20 } r={ 9 }
                    style={{
                        display: this.state.value ? "initial" : "none",
                        fill: "none",
                        stroke: Color.setLightness(
                            Shared.theme.colortab.frontground2, 0.7
                        ),
                        strokeWidth: 3.6,
                        pointerEvents: "none"
                    }} />
                    <text x={ 100 } y={ 20 } textAnchor="middle"
                    style={{
                        fill: Shared.theme.colortab.border,
                        transform: "translate(-0.5em,0.2em)"
                    }} >
                        { this.props.formatter(this.state.value) }
                    </text>
                </svg>
            </div>
        );
    }

    protected resize(): void {
        const svg: JQuery<SVGSVGElement> = $(this.svg.current!);

        const w: number = svg.width()!;

        const background: JQuery<SVGRectElement> = svg.children("rect.background") as unknown as JQuery<SVGRectElement>;
        const target: JQuery<SVGCircleElement> = svg.children("circle.target") as unknown as JQuery<SVGCircleElement>;
        const text: JQuery<SVGTextElement> = svg.children("text") as unknown as JQuery<SVGTextElement>;

        const x1: number = 4 + 0.05 * w;
        const x2: number = 0.7 * w - 16;

        background.attr("x", x1);
        target.attr("cx", x1 + 14);
        text.attr("x", x2 + (w - x2) / 2);
    }

    public componentDidMount(): void {
        this.resize();
        $(window).on("resize", this.resizeListener);
    }

    public componentWillUnmount(): void {
        $(window).off("resize", this.resizeListener);
    }

    public componentDidUpdate(): void {
        this.resize();
    }

};
