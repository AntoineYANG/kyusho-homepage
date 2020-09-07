/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-06 01:19:10 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-07 03:48:09
 */

import React from "react";
import $ from "jquery";
import flvjs from "flv.js";
import { Shared } from "../methods/globals";
import { ResponsiveComponent } from "./ResponsiveComponent";
import { isFullScreen } from "../methods/screen";


export interface BilibiliFlvProps {
    autoPlay?: boolean;
    control?: BilibiliFlvControlInterface;
    onPlayEnd?: () => void;
    type: "flv" | "mp4";
    url: string;
};

export interface BilibiliFlvState {
    control: BilibiliFlvControlInterface;
    state: "playing" | "paused";
    volume: number;
    muted: boolean;
    duration: number;
    buffered: number;
    curTime: number;
    w: number;
};

/**
 * 基于 bilibili/flv.js 制作的组件.
 *
 * @export
 * @class BilibiliFlv
 * @extends {ResponsiveComponent<BilibiliFlvProps, BilibiliFlvState>}
 */
export class BilibiliFlv extends ResponsiveComponent<BilibiliFlvProps, BilibiliFlvState> {

    protected dom: React.RefObject<HTMLVideoElement>;
    protected control: React.RefObject<HTMLDivElement>;
    protected progBase: React.RefObject<SVGSVGElement>;
    protected progBuffer: React.RefObject<SVGRectElement>;
    protected progCurrent: React.RefObject<SVGRectElement>;
    protected progFlag: React.RefObject<SVGGElement>;
    protected timetip: React.RefObject<HTMLDivElement>;

    private progW: number;
    private scaling: number;

    private timer: NodeJS.Timeout;
    private focus: number | null;
    private copy: HTMLVideoElement;

    private keyDownLock: boolean;
    private dragging: boolean;
    private gesture: null | "unknown" | "dragging" | "volume" | "lightness";

    public constructor(props: BilibiliFlvProps) {
        super(props);
        this.state = {
            control: this.props.control || BilibiliFlvControlDefault,
            state: this.props.autoPlay ? "playing" : "paused",
            duration: 0,
            buffered: 0,
            curTime: 0,
            volume: 0.4,
            muted: false,
            w: 0
        };

        this.dom = React.createRef<HTMLVideoElement>();
        this.control = React.createRef<HTMLDivElement>();
        this.progBase = React.createRef<SVGSVGElement>();
        this.progBuffer = React.createRef<SVGRectElement>();
        this.progCurrent = React.createRef<SVGRectElement>();
        this.progFlag = React.createRef<SVGGElement>();
        this.timetip = React.createRef<HTMLDivElement>();

        this.progW = 100;
        this.scaling = 1;

        this.timer = setTimeout(() => void 0, 0);
        this.focus = null;
        this.copy = document.createElement("video");
        this.copy.style.width = "100%";
        this.copy.style.height = "100%";

        this.keyDownLock = false;
        this.dragging = false;
        this.gesture = null;
    }

    public render(): JSX.Element {
        this.scaling = Math.sqrt(this.state.w / 1200);

        return (
            <div
            onMouseMove={
                () => {
                    if (this.control.current) {
                        $(this.control.current).fadeIn(200);
                        clearTimeout(this.timer);
                        this.timer = setTimeout(() => {
                            $(this.control.current || {}).fadeOut(800);
                        }, 1600);
                    }
                }
            }
            onKeyPress={
                e => {
                    if (this.handleKeyPress(e.which)) {
                        e.preventDefault();
                    }
                }
            }
            onKeyDown={
                e => {
                    if (this.handleKeyDown(e.which)) {
                        e.preventDefault();
                    }
                }
            }
            onKeyUp={
                () => {
                    this.keyDownLock = false;
                }
            }
            style={{
                overflow: "hidden",
                cursor: (() => {
                    return isFullScreen() ? "default" : "none"
                })()
            }} >
                <video key="video" ref={ this.dom } autoPlay={ this.props.autoPlay }
                style={{
                    display: "block",
                    width: "100%",
                    cursor: "inherit"
                }}
                onMouseOver={
                    () => {
                        Shared.cursorState = "pointer";
                        $(this.dom.current!).focus();
                    }
                }
                onMouseOut={
                    () => {
                        Shared.cursorState = "normal";
                    }
                }
                onMouseDown={
                    (ev: React.MouseEvent) => {
                        this.gesture = "unknown";

                        const x0: number = ev.clientX;
                        const y0: number = ev.clientY;
                        
                        const W: number = window.innerWidth;
                        const H: number = (
                            this.dom.current?.clientHeight
                        ) || (
                            window.innerHeight / 2
                        );

                        let value0: number = 0;
                        
                        const mouseMoveListener = (e: MouseEvent) => {
                            const x: number = e.clientX;
                            const y: number = e.clientY;

                            if (this.gesture === "unknown") {
                                const dmx: number = Math.abs(
                                    x - x0
                                );
                                const dmy: number = Math.abs(
                                    y - y0
                                );
                                if (dmx + dmy >= W / 60 + 10) {
                                    clearTimeout(this.timer);
                                    $(this.control.current || {}).show();
                                    if (dmx > dmy) {
                                        this.gesture = "dragging";
                                        value0 = this.dom.current!.currentTime;
                                    } else if (x0 >= W / 2) {
                                        this.gesture = "volume";
                                        value0 = this.dom.current!.volume;
                                    } else {
                                        this.gesture = "lightness";
                                        value0 = 1;
                                    }
                                }
                            } else {
                                switch (this.gesture) {
                                    case "dragging":
                                        const time: number = Math.max(
                                            0, Math.min(
                                                (this.dom.current?.duration || 1) - 0.1,
                                                value0 + (
                                                    x - x0
                                                ) / W * (
                                                    this.dom.current?.duration || 1
                                                )
                                            )
                                        );
                                        if (this.dom.current) {
                                            this.dom.current.currentTime = time;
                                        }
                                        this.setState({
                                            curTime: this.dom.current?.currentTime || time
                                        });
                                        break;
                                    case "volume":
                                        const v: number = Math.max(
                                            0, Math.min(
                                                1,
                                                value0 + (
                                                    y0 - y
                                                ) / H / 2
                                            )
                                        );
                                        if (this.dom.current) {
                                            if (
                                                this.dom.current.muted
                                                || this.dom.current.volume !== v
                                            ) {
                                                this.dom.current.muted = false;
                                                this.dom.current.volume = v;
                                                this.setState({
                                                    muted: false,
                                                    volume: this.dom.current.volume
                                                });
                                            }
                                        }
                                        break;
                                    case "lightness":
                                        break;
                                }
                            }
                        };

                        const mouseUpListener = () => {
                            setTimeout(() => {
                                this.gesture = null;
                            }, 10);
                            clearTimeout(this.timer);
                            $(this.control.current || {}).show();
                            this.timer = setTimeout(() => {
                                $(this.control.current || {}).fadeOut(800);
                            }, 1600);
                            if (this.gesture === "unknown") {
                                if (this.dom.current) {
                                    if (this.dom.current.paused) {
                                        this.play();
                                    } else {
                                        this.pause();
                                    }
                                }
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
                    (ev: React.TouchEvent) => {
                        if (!this.gesture && ev.touches.length) {
                            this.gesture = "unknown";

                            const x0: number = ev.touches[0].clientX;
                            const y0: number = ev.touches[0].clientY;

                            let value0: number = 0;

                            const W: number = window.innerWidth;
                            const H: number = (
                                this.dom.current?.clientHeight
                            ) || (
                                window.innerHeight / 2
                            );

                            const touchMoveListener = (e: TouchEvent) => {
                                if (e.touches.length) {
                                    const x: number = e.touches[0].clientX;
                                    const y: number = e.touches[0].clientY;

                                    if (this.gesture === "unknown") {
                                        const W: number = window.innerWidth;
                                        const dmx: number = Math.abs(
                                            x - x0
                                        );
                                        const dmy: number = Math.abs(
                                            y - y0
                                        );
                                        if (dmx + dmy >= W / 60 + 10) {
                                            if (dmx > dmy) {
                                                this.gesture = "dragging";
                                            } else {
                                                this.gesture = x0 >= W / 2 ? "volume" : "lightness";
                                            }
                                        }
                                    } else {
                                        switch (this.gesture) {
                                            case "dragging":
                                                const time: number = Math.max(
                                                    0, Math.min(
                                                        (this.dom.current?.duration || 1) - 0.1,
                                                        value0 + (
                                                            x - x0
                                                        ) / W * (
                                                            this.dom.current?.duration || 1
                                                        )
                                                    )
                                                );
                                                if (this.dom.current) {
                                                    this.dom.current.currentTime = time;
                                                }
                                                this.setState({
                                                    curTime: this.dom.current?.currentTime || time
                                                });
                                                break;
                                            case "volume":
                                                const v: number = Math.max(
                                                    0, Math.min(
                                                        1,
                                                        value0 + (
                                                            y0 - y
                                                        ) / H / 2
                                                    )
                                                );
                                                if (this.dom.current) {
                                                    if (
                                                        this.dom.current.muted
                                                        || this.dom.current.volume !== v
                                                    ) {
                                                        this.dom.current.muted = false;
                                                        this.dom.current.volume = v;
                                                        this.setState({
                                                            muted: false,
                                                            volume: this.dom.current.volume
                                                        });
                                                    }
                                                }
                                                break;
                                            case "lightness":
                                                break;
                                        }
                                    }
                                }
                            };

                            const touchEndListener = () => {
                                setTimeout(() => {
                                    this.gesture = null;
                                }, 10);
                                clearTimeout(this.timer);
                                $(this.control.current || {}).show();
                                this.timer = setTimeout(() => {
                                    $(this.control.current || {}).fadeOut(800);
                                }, 1600);
                                if (this.gesture === "unknown") {
                                    if (this.dom.current) {
                                        if (this.dom.current.paused) {
                                            this.play();
                                        } else {
                                            this.pause();
                                        }
                                    }
                                }
                                document.body.removeEventListener(
                                    "touchmove", touchMoveListener
                                );
                                document.body.removeEventListener(
                                    "touchend", touchEndListener
                                );
                                document.body.removeEventListener(
                                    "touchcancel", touchEndListener
                                );
                            };

                            document.body.addEventListener(
                                "touchmove", touchMoveListener
                            );
                            document.body.addEventListener(
                                "touchend", touchEndListener
                            );
                            document.body.addEventListener(
                                "touchcancel", touchEndListener
                            );
                        }
                    }
                }
                onCanPlay={
                    () => {
                        this.setState({
                            duration: this.dom.current!.duration,
                            buffered: this.dom.current!.buffered.end(0),
                            curTime: this.dom.current!.currentTime,
                            volume: this.dom.current!.volume,
                            muted: this.dom.current!.muted
                        });
                    }
                }
                onTimeUpdate={
                    () => {
                        if (this.dom.current!.currentTime === this.dom.current!.duration) {
                            // 播完动作
                            (this.props.onPlayEnd || (() => {
                                this.dom.current!.pause();
                                this.dom.current!.currentTime = 0;
                                clearTimeout(this.timer);
                                $(this.control.current || {}).fadeIn(0);
                                this.timer = setTimeout(() => {
                                    $(this.control.current || {}).fadeOut(800);
                                }, 1600);
                                this.setState({
                                    state: "paused",
                                    curTime: 0
                                });
                            }))();
                        } else {
                            this.setState({
                                duration: this.dom.current!.duration,
                                buffered: this.dom.current!.buffered.end(0),
                                curTime: this.dom.current!.currentTime
                            });
                        }
                    }
                } >
                    Please update your browser to support HTML5 video.
                </video>
                <div key="control" ref={ this.control }
                style={{
                    width: `${ this.state.w - 10 }px`,
                    background: this.state.control.background,
                    height: `${ 36 * this.scaling }px`,
                    padding: "0 6px",
                    position: "relative",
                    top: `-${ 36 * this.scaling }px`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    marginBottom: `-${ 36 * this.scaling }px`,
                    cursor: "inherit"
                }}
                onMouseOver={
                    () => {
                        $(this.control.current || {}).fadeIn(200);
                        clearTimeout(this.timer);
                    }
                }
                onMouseOut={
                    () => {
                        clearTimeout(this.timer);
                        this.timer = setTimeout(() => {
                            $(this.control.current || {}).fadeOut(800);
                        }, 1600);
                    }
                }
                onMouseMove={
                    e => {
                        e.stopPropagation();
                        $(this.control.current || {}).fadeIn(200);
                        clearTimeout(this.timer);
                    }
                } >
                    {/* 播放/暂停按钮 */}
                    <svg key="play" viewBox="0 0 36 36"
                    style={{
                        width: `${ 36 * this.scaling }px`,
                        height: `${ 36 * this.scaling }px`,
                        // border: "1px solid blue",
                        cursor: "inherit"
                    }} >
                        { this.state.state === "playing" ? (
                            this.state.control.btnStop.map((d, i) => {
                                return {
                                    ...d,
                                    props: i ? {
                                        ...d.props,
                                        style: {
                                            ...d.props.style,
                                            pointerEvents: "none",
                                            cursor: "inherit"
                                        }
                                    } : {
                                        onMouseOver: () => {
                                            Shared.cursorState = "pointer";
                                        },
                                        onMouseOut: () => {
                                            Shared.cursorState = "normal";
                                        },
                                        onClick: () => this.pause(),
                                        ...d.props
                                    },
                                    key: i
                                };
                            })
                        ) : (
                            this.state.control.btnPlay.map((d, i) => {
                                return {
                                    ...d,
                                    props: i ? {
                                        ...d.props,
                                        style: {
                                            ...d.props.style,
                                            pointerEvents: "none",
                                            cursor: "inherit"
                                        }
                                    } : {
                                        onMouseOver: () => {
                                            Shared.cursorState = "pointer";
                                        },
                                        onMouseOut: () => {
                                            Shared.cursorState = "normal";
                                        },
                                        onClick: () => this.play(),
                                        ...d.props
                                    },
                                    key: i
                                };
                            })
                        ) }
                    </svg>
                    {/* 当前时间 */}
                    <label key="curTime" style={{
                        display: "inline-block",
                        fontSize: `${ 12 * Math.sqrt(this.scaling) }px`,
                        width: `${ 48 * this.scaling }px`,
                        maxHeight: `${ 36 * this.scaling }px`,
                        cursor: "inherit",
                        // border: "1px solid blue",
                        color: this.state.control.color
                    }} >
                        { BilibiliFlv.toTimeString(this.state.curTime) }
                    </label>
                    {/* 进度条 */}
                    <svg key="progress"
                    style={{
                        height: `${ 36 * this.scaling }px`,
                        // border: "1px solid blue",
                        cursor: "inherit",
                        flex: 1
                    }} >
                    {/* 背景 */}
                    {
                        {
                            ...this.state.control.progressBase,
                            props: {
                                ...this.state.control.progressBase.props,
                                y: parseFloat(
                                    this.state.control.progressBase.props.y || "0"
                                ) * this.scaling,
                                y1: parseFloat(
                                    this.state.control.progressBase.props.y1 || "0"
                                ) * this.scaling,
                                y2: parseFloat(
                                    this.state.control.progressBase.props.y2 || "0"
                                ) * this.scaling,
                                cy: parseFloat(
                                    this.state.control.progressBase.props.cy || "0"
                                ) * this.scaling,
                                r: parseFloat(
                                    this.state.control.progressBase.props.r || "0"
                                ) * this.scaling,
                                rx: parseFloat(
                                    this.state.control.progressBase.props.rx || "0"
                                ) * this.scaling,
                                ry: parseFloat(
                                    this.state.control.progressBase.props.ry || "0"
                                ) * this.scaling,
                                height: parseFloat(
                                    this.state.control.progressBase.props.height || "0"
                                ) * this.scaling,
                                onMouseOver: (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
                                    Shared.cursorState = "pointer";
                                    const x: number = e.clientX - (
                                        $(e.currentTarget).offset()?.left || 0
                                    );
                                    const time: number = this.state.duration / (
                                        $(e.currentTarget).width()!
                                    ) * x;
                                    this.focus = time;
                                    this.forceUpdate();
                                    if (!this.timetip.current) {
                                        return;
                                    }
                                    this.timetip.current.style.top = `${
                                        ($(e.currentTarget).offset()?.top || 0) - (
                                            $(window).scrollTop() || 0
                                        )
                                    }px`;
                                    this.timetip.current.style.left = `${
                                        e.clientX
                                    }px`;
                                },
                                onMouseMove: (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
                                    Shared.cursorState = "pointer";
                                    const x: number = e.clientX - (
                                        $(e.currentTarget).offset()?.left || 0
                                    );
                                    const time: number = this.state.duration / (
                                        $(e.currentTarget).width()!
                                    ) * x;
                                    this.focus = time;
                                    this.forceUpdate();
                                    if (!this.timetip.current) {
                                        return;
                                    }
                                    this.timetip.current.style.top = `${
                                        ($(e.currentTarget).offset()?.top || 0) - (
                                            $(window).scrollTop() || 0
                                        )
                                    }px`;
                                    this.timetip.current.style.left = `${
                                        e.clientX
                                    }px`;
                                },
                                onMouseOut: () => {
                                    Shared.cursorState = "normal";
                                    this.focus = null;
                                    this.forceUpdate();
                                },
                                onClick: (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
                                    if (!this.dom.current) {
                                        return;
                                    }
                                    
                                    const x: number = e.clientX - (
                                        $(e.currentTarget).offset()?.left || 0
                                    );
                                    const time: number = this.state.duration / (
                                        $(e.currentTarget).width()!
                                    ) * x;
                                    this.dom.current.currentTime = time;
                                    this.setState({
                                        curTime: time
                                    });
                                },
                                x: 20 * this.scaling
                            },
                            key: "base",
                            ref: this.progBase
                        }
                    }
                    {/* 已缓冲 */}
                    {
                        {
                            ...this.state.control.progressBuffer,
                            props: {
                                ...this.state.control.progressBuffer.props,
                                y: parseFloat(
                                    this.state.control.progressBuffer.props.y || "0"
                                ) * this.scaling,
                                y1: parseFloat(
                                    this.state.control.progressBuffer.props.y1 || "0"
                                ) * this.scaling,
                                y2: parseFloat(
                                    this.state.control.progressBuffer.props.y2 || "0"
                                ) * this.scaling,
                                cy: parseFloat(
                                    this.state.control.progressBuffer.props.cy || "0"
                                ) * this.scaling,
                                r: parseFloat(
                                    this.state.control.progressBuffer.props.r || "0"
                                ) * this.scaling,
                                rx: parseFloat(
                                    this.state.control.progressBuffer.props.rx || "0"
                                ) * this.scaling,
                                ry: parseFloat(
                                    this.state.control.progressBuffer.props.ry || "0"
                                ) * this.scaling,
                                height: parseFloat(
                                    this.state.control.progressBuffer.props.height || "0"
                                ) * this.scaling,
                                style: {
                                    ...this.state.control.progressBuffer.props.style,
                                    pointerEvents: "none",
                                    cursor: "inherit"
                                },
                                x: 20 * this.scaling
                            },
                            key: "buffer",
                            ref: this.progBuffer
                        }
                    }
                    {/* 当前进度 */}
                    {
                        {
                            ...this.state.control.progressCurrent,
                            props: {
                                ...this.state.control.progressCurrent.props,
                                y: parseFloat(
                                    this.state.control.progressCurrent.props.y || "0"
                                ) * this.scaling,
                                y1: parseFloat(
                                    this.state.control.progressCurrent.props.y1 || "0"
                                ) * this.scaling,
                                y2: parseFloat(
                                    this.state.control.progressCurrent.props.y2 || "0"
                                ) * this.scaling,
                                cy: parseFloat(
                                    this.state.control.progressCurrent.props.cy || "0"
                                ) * this.scaling,
                                r: parseFloat(
                                    this.state.control.progressCurrent.props.r || "0"
                                ) * this.scaling,
                                rx: parseFloat(
                                    this.state.control.progressCurrent.props.rx || "0"
                                ) * this.scaling,
                                ry: parseFloat(
                                    this.state.control.progressCurrent.props.ry || "0"
                                ) * this.scaling,
                                height: parseFloat(
                                    this.state.control.progressCurrent.props.height || "0"
                                ) * this.scaling,
                                style: {
                                    ...this.state.control.progressCurrent.props.style,
                                    pointerEvents: "none",
                                    cursor: "inherit"
                                },
                                x: 20 * this.scaling
                            },
                            key: "current",
                            ref: this.progCurrent
                        }
                    }
                    {/* 标志 */}
                    {
                        {
                            ...this.state.control.progressFlag,
                            props: {
                                ...this.state.control.progressFlag.props,
                                y: parseFloat(
                                    this.state.control.progressFlag.props.y || "0"
                                ) * this.scaling,
                                y1: parseFloat(
                                    this.state.control.progressFlag.props.y1 || "0"
                                ) * this.scaling,
                                y2: parseFloat(
                                    this.state.control.progressFlag.props.y2 || "0"
                                ) * this.scaling,
                                cy: parseFloat(
                                    this.state.control.progressFlag.props.cy || "0"
                                ) * this.scaling,
                                r: parseFloat(
                                    this.state.control.progressFlag.props.r || "0"
                                ) * this.scaling,
                                rx: parseFloat(
                                    this.state.control.progressFlag.props.rx || "0"
                                ) * this.scaling,
                                ry: parseFloat(
                                    this.state.control.progressFlag.props.ry || "0"
                                ) * this.scaling,
                                height: parseFloat(
                                    this.state.control.progressFlag.props.height || "0"
                                ) * this.scaling,
                                style: {
                                    ...this.state.control.progressFlag.props.style,
                                    transform: `translate(-100vw, 50%)`,
                                    cursor: "inherit"
                                },
                                onMouseOver: (
                                    () => {
                                        Shared.cursorState = "pointer";
                                    }
                                ),
                                onMouseOut: (
                                    () => {
                                        Shared.cursorState = "normal";
                                    }
                                ),
                                onMouseDown: (
                                    () => {
                                        this.dragging = true;

                                        const target: SVGSVGElement = this.progBase.current!;
                                        const w: number = this.progW;
                                        const offset: number = (
                                            $(target).offset()?.left || 0
                                        );

                                        const k = setInterval(
                                            () => {
                                                clearTimeout(this.timer);
                                                $(this.control.current!).show();
                                            }, 1000
                                        );
                                        
                                        const mouseMoveListener = (e: MouseEvent) => {
                                            const x: number = e.clientX - offset;
                                            const time: number = Math.max(
                                                0, Math.min(
                                                    this.dom.current?.duration || 1,
                                                    this.state.duration / w * x
                                                )
                                            );
                                            if (this.dom.current) {
                                                this.dom.current.pause();
                                                this.dom.current.currentTime = time;
                                            }
                                            this.setState({
                                                state: "paused",
                                                curTime: this.dom.current?.currentTime || time
                                            });
                                        };
            
                                        const mouseUpListener = () => {
                                            this.dragging = false;
                                            document.body.removeEventListener(
                                                "mousemove", mouseMoveListener
                                            );
                                            document.body.removeEventListener(
                                                "mouseup", mouseUpListener
                                            );
                                            clearInterval(k);
                                        };
            
                                        document.body.addEventListener(
                                            "mousemove", mouseMoveListener
                                        );
                                        document.body.addEventListener(
                                            "mouseup", mouseUpListener
                                        );
                                    }
                                )
                            },
                            onTouchMove: (
                                () => {
                                    if (!this.dragging) {
                                        this.dragging = true;

                                        const target: SVGSVGElement = this.progBase.current!;
                                        const w: number = this.progW;
                                        const offset: number = (
                                            $(target).offset()?.left || 0
                                        );

                                        const touchMoveListener = (e: TouchEvent) => {
                                            if (e.touches.length) {
                                                clearTimeout(this.timer);
                                                $(this.control.current!).show();
                                                const x: number = e.touches[0].clientX - offset;
                                                const time: number = Math.max(
                                                    0, Math.min(
                                                        this.dom.current?.duration || 1,
                                                        this.state.duration / w * x
                                                    )
                                                );
                                                if (this.dom.current) {
                                                    this.dom.current.pause();
                                                    this.dom.current.currentTime = time;
                                                }
                                                this.setState({
                                                    state: "paused",
                                                    curTime: this.dom.current?.currentTime || time
                                                });
                                            }
                                        };

                                        const touchEndListener = () => {
                                            this.dragging = false;
                                            document.body.removeEventListener(
                                                "touchmove", touchMoveListener
                                            );
                                            document.body.removeEventListener(
                                                "touchend", touchEndListener
                                            );
                                            document.body.removeEventListener(
                                                "touchcancel", touchEndListener
                                            );
                                        };
            
                                        document.body.addEventListener(
                                            "touchmove", touchMoveListener
                                        );
                                        document.body.addEventListener(
                                            "touchend", touchEndListener
                                        );
                                        document.body.addEventListener(
                                            "touchcancel", touchEndListener
                                        );
                                    }
                                }
                            ),
                            key: "flag",
                            ref: this.progFlag
                        }
                    }
                    </svg>
                    {/* 总时间 */}
                    <label key="duration" style={{
                        display: "inline-block",
                        fontSize: `${ 12 * Math.sqrt(this.scaling) }px`,
                        width: `${ 48 * this.scaling }px`,
                        maxHeight: `${ 36 * this.scaling }px`,
                        cursor: "inherit",
                        // border: "1px solid blue",
                        color: this.state.control.color
                    }} >
                        { BilibiliFlv.toTimeString(this.state.duration) }
                    </label>
                    {/* 音量 */}
                    <svg key="volume" viewBox="0 0 36 36"
                    style={{
                        width: `${ 36 * this.scaling }px`,
                        height: `${ 36 * this.scaling }px`,
                        // border: "1px solid blue",
                        cursor: "inherit"
                    }} >
                    {
                        this.state.control.displayVolume(
                            this.state.muted,
                            this.state.volume
                        ).map((d, i) => {
                            return {
                                ...d,
                                props: i ? {
                                    ...d.props,
                                    style: {
                                        ...d.props.style,
                                        pointerEvents: "none",
                                        cursor: "inherit"
                                    }
                                } : {
                                    onMouseOver: () => {
                                        Shared.cursorState = "pointer";
                                    },
                                    onMouseOut: () => {
                                        Shared.cursorState = "normal";
                                    },
                                    onClick: () => {
                                        const v: boolean = !this.dom.current!.muted;
                                        this.dom.current!.muted = v;
                                        this.setState({
                                            muted: v
                                        });
                                    },
                                    ...d.props
                                },
                                key: i
                            };
                        })
                    }
                    </svg>
                    {/* 全屏按钮 */}
                    <svg key="fullscreen" viewBox="0 0 36 36"
                    style={{
                        width: `${ 36 * this.scaling }px`,
                        height: `${ 36 * this.scaling }px`,
                        // border: "1px solid blue",
                        cursor: "inherit"
                    }} >
                    {
                        (isFullScreen() ? this.state.control.btnExitFullScreen
                            : this.state.control.btnFullScreen
                        ).map((d, i) => {
                            return {
                                ...d,
                                props: i ? {
                                    ...d.props,
                                    style: {
                                        ...d.props.style,
                                        pointerEvents: "none",
                                        cursor: "inherit"
                                    }
                                } : {
                                    onMouseOver: () => {
                                        Shared.cursorState = "pointer";
                                    },
                                    onMouseOut: () => {
                                        Shared.cursorState = "normal";
                                    },
                                    onClick: () => this.fullScreen(),
                                    ...d.props
                                },
                                key: i
                            };
                        })
                    }
                    </svg>
                </div>
                {/* 预览器 */}
                <div key="timetip" ref={ this.timetip }
                style={{
                    pointerEvents: "none",
                    display: typeof this.focus === "number" ? "unset" : "none",
                    position: "fixed",
                    top: -100,
                    left: -100,
                    cursor: "inherit",
                    transform: "translate(-50%,-100%)"
                }} >
                {
                    this.dom.current && typeof this.focus === "number" ? (
                        (() => {
                            this.copy.currentTime = this.focus;

                            return this.state.control.getSnapshot(this.focus, this.copy);
                        })()
                    ) : null
                }
                </div>
            </div>
        );
    }

    /**
     * 调整进度条元素.
     *
     * @protected
     * @returns {void}
     * @memberof BilibiliFlv
     */
    protected adjustBox(): void {
        if (!this.progBase.current || !this.progBuffer.current
            || !this.progCurrent.current || !this.progFlag.current
            || !this.progBase.current.parentElement) {
            return;
        }

        if (this.control.current) {
            clearTimeout(this.timer);
            $(this.control.current).show();
            this.timer = setTimeout(() => {
                $(this.control.current || {}).fadeOut(800);
            }, 1600);
        } else {
            return;
        }

        const w: number = (
            this.progBase.current.parentElement.clientWidth
        );

        this.progW = w - 40 * this.scaling;
        
        // progress-base
        this.progBase.current.setAttribute("width", `${ this.progW }px`);
        // progress-buffered
        this.progBuffer.current.setAttribute("width", `${
            this.progW / this.state.duration * this.state.buffered || 0
        }px`);
        // progress-current
        this.progCurrent.current.setAttribute("width", `${
            this.progW / this.state.duration * this.state.curTime || 0
        }px`);
        // progress-flag
        this.progFlag.current.style.transform = `translate(${
            (this.progW / this.state.duration * this.state.curTime) + 20 * this.scaling
        }px, 50%)`;
    }

    /**
     * 调整进度条.
     *
     * @private
     * @returns {void}
     * @memberof BilibiliFlv
     */
    private adjustProgress(): void {
        if (!this.progBase.current || !this.progBuffer.current
            || !this.progCurrent.current || !this.progFlag.current) {
            return;
        }

        const w: number = this.progW;
        
        // progress-buffered
        this.progBuffer.current.setAttribute("width", `${
            w / this.state.duration * this.state.buffered || 0
        }px`);
        // progress-current
        this.progCurrent.current.setAttribute("width", `${
            w / this.state.duration * this.state.curTime || 0
        }px`);
        // progress-flag
        this.progFlag.current.style.transform = `translate(${
            (w / this.state.duration * this.state.curTime) + 20 * this.scaling
        }px, 50%)`;
    }

    public componentDidMountRE(): void {
        if (flvjs.isSupported() && this.dom.current) {
            const flvPlayer = flvjs.createPlayer({
                type: this.props.type,
                url: this.props.url
            });
            flvPlayer.attachMediaElement(this.dom.current);
            flvPlayer.load();
            this.dom.current.muted = this.state.muted;
            this.dom.current.volume = this.state.volume;
            const flvPlayerSS = flvjs.createPlayer({
                type: this.props.type,
                url: this.props.url
            });
            flvPlayerSS.attachMediaElement(this.copy);
            flvPlayerSS.load();
            setTimeout(() => {
                this.adjustBox();
            }, 0);
        }
    }

    public componentWillResize(): void {
        const w: number = this.dom.current?.offsetWidth || 0;
        if (w !== this.state.w) {
            setTimeout(() => {
                this.adjustBox();
            }, 0);
            this.setState({
                w: w
            });
        }
    }

    public componentDidUpdate(): void {
        this.adjustProgress();
    }

    public static toTimeString(sec: number): string {
        const minutes: number = Math.floor(sec / 60);
        const seconds: number = Math.floor(sec % 60);

        return `${
            minutes.toString().padStart(2, "0")
        }:${
            seconds.toString().padStart(2, "0")
        }`;
    }

    protected handleKeyPress(which: number): boolean {
        if (!this.control.current || !this.dom.current) {
            return false;
        }

        switch (which) {
            case 13:    // enter
                this.fullScreen();
                break;
            case 32:    // space
                if (this.dom.current.paused) {
                    this.play();
                } else {
                    this.pause();
                }
                break;
            case 61:    // =
            case 43:    // +
                this.setVolume(0.05, "+");
                break;
            case 45:    // -
            case 95:    // _
                this.setVolume(0.05, "-");
                break;
            default:
                // console.log(which);
                return false;
        }

        clearTimeout(this.timer);
        $(this.control.current).fadeIn(0);
        this.timer = setTimeout(() => {
            $(this.control.current!).fadeOut(800);
        }, 1600);
        
        return true;
    }

    protected handleKeyDown(which: number): boolean {
        if (!this.control.current || !this.dom.current || this.keyDownLock) {
            return false;
        }

        switch (which) {
            case 38:    // up
                this.setVolume(0.05, "+");
                break;
            case 40:    // down
                this.setVolume(0.05, "-");
                break;
            case 37:    // left
                this.setTime(15, "-");
                break;
            case 39:    // right
                this.setTime(15, "+");
                break;
            default:
                // console.log(which);
                return false;
        }

        this.keyDownLock = true;

        clearTimeout(this.timer);
        $(this.control.current).fadeIn(0);
        this.timer = setTimeout(() => {
            $(this.control.current!).fadeOut(800);
        }, 1600);
        
        return true;
    }

    protected play(): void {
        if (!flvjs.isSupported() || !this.dom.current) {
            return;
        }
        if (this.dom.current.paused) {
            this.dom.current.play();
            this.setState({
                state: "playing"
            });
        }
    }

    protected pause(): void {
        if (!flvjs.isSupported() || !this.dom.current) {
            return;
        }
        if (!this.dom.current.paused) {
            this.dom.current.pause();
            this.setState({
                state: "paused"
            });
        }
    }

    protected setVolume(val: number, op?: "+" | "-"): void {
        if (!this.dom.current) {
            return;
        }
        const v: number = Math.max(
            0, Math.min(
                1, op ? (
                    this.dom.current.volume + (
                        op === "+" ? 1 : -1
                    ) * val
                ) : val
            )
        );
        if (v !== this.dom.current.volume) {
            this.dom.current.volume = v;
            this.dom.current.muted = this.dom.current.volume === 0;
            this.setState({
                volume: this.dom.current.volume,
                muted: this.dom.current.volume === 0
            });
        }
    }

    protected setTime(val: number, op?: "+" | "-"): void {
        if (!this.dom.current) {
            return;
        }
        const v: number = Math.max(
            0, Math.min(
                this.dom.current.duration - 0.1, op ? (
                    this.dom.current.currentTime + (
                        op === "+" ? 1 : -1
                    ) * val
                ) : val
            )
        );
        if (v !== this.dom.current.currentTime) {
            this.dom.current.currentTime = v;
            this.setState({
                curTime: this.dom.current.currentTime
            });
        }
    }

    protected fullScreen(): void {
        if (!this.dom.current) {
            return;
        }

        $(this.dom.current).focus();
        
        if (isFullScreen()) {
            // 退出全屏
            let possibleKeysCanceling: Array<string> = [];
            for (const key in document) {
                if (key.toLocaleLowerCase().includes("cancelfullscreen")
                && typeof (document as any)[key] === "function") {
                    possibleKeysCanceling.push(key);
                }
            }
            if (possibleKeysCanceling.length) {
                (document as any)[possibleKeysCanceling[0]]();
                this.forceUpdate();
            }
        } else {
            // 全屏
            const container: HTMLDivElement = this.dom.current.parentElement! as HTMLDivElement;
            let possibleKeysRequesting: Array<string> = [];
            for (const key in container) {
                if (key.toLocaleLowerCase().includes("requestfullscreen")
                && typeof (container as any)[key] === "function") {
                    possibleKeysRequesting.push(key);
                }
            }
            if (possibleKeysRequesting.length) {
                (container as any)[possibleKeysRequesting[0]]();
                this.forceUpdate();
            }
        }
    }

    public componentWillUnmountRE(): void {
        clearTimeout(this.timer);
    }

};

/**
 * 播放器组件的控制条元素.
 *
 * @export
 * @interface BilibiliFlvControlInterface
 */
export interface BilibiliFlvControlInterface {
    /** 整体背景样式 (style.background) */
    background: string;

    /** 播放按钮 */
    btnPlay: Array<JSX.Element>;    // 第一个元素作为判断交互的碰撞箱 (下同)
    /** 暂停按钮 */
    btnStop: Array<JSX.Element>;

    /** 时间字体颜色 */
    color: string;

    /** 进度条：背景，rect，x坐标自动延伸 */
    progressBase: JSX.Element;
    /** 进度条：加载，rect，x坐标自动定位 */
    progressBuffer: JSX.Element;
    /** 进度条：进度，rect，x坐标自动定位 */
    progressCurrent: JSX.Element;
    /** 进度条：标志，transformY(50%)，transformX自动定位 */
    progressFlag: JSX.Element;

    /** 渲染快照预览 */
    getSnapshot: (time: number, o: HTMLVideoElement) => JSX.Element;

    /** 渲染音量显示 */
    displayVolume: (muted: boolean, volume: number) => Array<JSX.Element>;

    /** 全屏按钮 */
    btnFullScreen: Array<JSX.Element>;
    /** 退出全屏按钮 */
    btnExitFullScreen: Array<JSX.Element>;
};

/**
 * 默认的控制条元素.
 */
export const BilibiliFlvControlDefault: BilibiliFlvControlInterface = {
    background: "rgba(30,30,30,0.9)",

    btnPlay: [(
        <circle
        cx="18" cy="18" r="16"
        style={{
            fill: "#00000000"
        }} />
    ), (
        <path d={
            "M11,10 Q11,8 17,11.33 L25,15.78 Q29,18 25,20.22 L17,24.67 Q11,28 11,26 Z"
        }
        style={{
            fill: "rgb(250,250,250)"
        }} />
    )],
    btnStop: [(
        <circle
        cx="18" cy="18" r="16"
        style={{
            fill: "#00000000"
        }} />
    ), (
        <path d={
            "M11,10 L15,10 L15,26 L11,26 Z M21,10 L25,10 L25,26 L21,26 Z"
        }
        style={{
            fill: "rgb(250,250,250)"
        }} />
    )],

    color: "rgb(255,255,255)",

    progressBase: (
        <rect y="15" height="6" rx="3" ry="3"
        style={{
            fill: "rgb(90,90,90)"
        }} />
    ),
    progressBuffer: (
        <rect y="15" height="6" rx="3" ry="3"
        style={{
            fill: "rgb(124,124,124)"
        }} />
    ),
    progressCurrent: (
        <rect y="15" height="6" rx="3" ry="3"
        style={{
            fill: "rgb(203,200,202)"
        }} />
    ),
    progressFlag: (
        <circle cy="0" r="6" cx="0"
        style={{
            fill: "rgb(255,255,255)",
            stroke: "rgb(30,30,30)"
        }} />
    ),

    getSnapshot: (time: number, o: HTMLVideoElement) => {
        const randomId: string = (Math.random() * 1e6).toFixed(0);

        setTimeout(() => {
            $(`#${ randomId }`).append(o);
        }, 20);

        return (
            <div style={{
                width: "16vmin",
                backgroundColor: "rgb(30,30,30)",
                padding: "4px"
            }} >
                <div id={ randomId }
                style={{
                    display: "block"
                }} />
                <label
                style={{
                    display: "block",
                    fontSize: "12px"
                }} >
                    { BilibiliFlv.toTimeString(time) }
                </label>
            </div>
        );
    },

    displayVolume: (muted: boolean, volume: number) => {
        const f = (val: number) => (220 - 260 * val) / 180 * Math.PI;
        const tickC: number = 5 + Math.floor(window.innerWidth / 360) * 2;
        const ticks: Array<number> = new Array<number>(tickC).fill(0).map(
            (_, i) => i / (tickC - 1)
        );

        return [(
            <circle key="interaction"
            cx="18" cy="18" r="16"
            style={{
                fill: "#00000000"
            }} />
        ), ...ticks.map(
            (d, i) => {
                return (
                    <line
                    x1={ 18 + Math.cos(f(d)) * 9 } x2={ 18 + Math.cos(f(d)) * 13 }
                    y1={ 20 - Math.sin(f(d)) * 9 } y2={ 20 - Math.sin(f(d)) * 13 }
                    style={{
                        stroke: "rgba(220,220,220,0.5)",
                        strokeWidth: i === 0 ? 2.4 : 1.2
                    }} />
                );
            }
        ), (
            <circle key="btn"
            cx="18" cy="20" r="7.5"
            style={{
                fill: muted ? "rgba(250,250,250,0.6)" : "rgb(250,250,250)"
            }} />
        ), (
            <circle key="pointer" r="3"
            cx={ 18 + Math.cos(f(volume)) * 4 }
            cy={ 20 - Math.sin(f(volume)) * 4 }
            style={{
                fill: muted ? "rgba(37,37,37,0.6)" : "rgb(242,55,38)"
            }} />
        )];
    },

    btnFullScreen: [(
        <circle
        cx="18" cy="18" r="16"
        style={{
            fill: "#00000000"
        }} />
    ), (
        <path d={
            "M8,16 L8,10 L14,10 "
            + "M22,10 L28,10 L28,16 "
            + "M28,20 L28,26 L22,26 "
            + "M14,26 L8,26 L8,20"
        }
        style={{
            fill: "none",
            stroke: "rgb(250,250,250)",
            strokeWidth: 2
        }} />
    )],
    btnExitFullScreen: [(
        <circle
        cx="18" cy="18" r="16"
        style={{
            fill: "#00000000"
        }} />
    ), (
        <path d={
            "M8,15 L14,15 L14,10 "
            + "M22,10 L22,15 L28,15 "
            + "M28,21 L22,21 L22,26 "
            + "M14,26 L14,21 L8,21"
        }
        style={{
            fill: "none",
            stroke: "rgb(250,250,250)",
            strokeWidth: 2
        }} />
    )],
};
