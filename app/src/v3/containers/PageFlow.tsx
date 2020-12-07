/*
 * @Author: Kanata You 
 * @Date: 2020-09-24 14:06:26 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-07 12:05:02
 */

import React, { Component } from "react";
import { SubscribeWheelEvent, IsWheelEventValid, UnsubscribeWheelEvent } from "../tools/WheelEventManager";


export interface PageFlowProps {
    height: string | number;
    children?: Array<JSX.Element>;
    style?: React.CSSProperties;
};

export interface PageFlowState {
    idx: number;
};

export class PageFlow extends Component<PageFlowProps, PageFlowState> {

    protected wheelEvent: (this: HTMLElement, ev: WheelEvent) => any;
    protected keyDownEvent: (this: HTMLElement, ev: KeyboardEvent) => any;

    protected container: React.RefObject<HTMLDivElement>;

    protected cdHolder: boolean;
    protected aniDirection: "up" | "down";
    protected timers: Array<NodeJS.Timeout>;

    protected touched: boolean;
    protected originY: number;

    public constructor(props: PageFlowProps) {
        super(props);
        this.state = {
            idx: 0
        };

        this.wheelEvent = (e: WheelEvent) => {
            if (this.container.current) {
                if (!this.container.current.firstElementChild!.firstElementChild) {
                    return;
                }

                if (this.cdHolder) {
                    e.preventDefault();
                    SubscribeWheelEvent(e);
                    return;
                }

                if (navigator.userAgent.toLocaleLowerCase().includes("firefox")) {
                    // 火狐浏览器
                    if (this.props.children?.length === 1) {
                        // 跳过
                    } else if (this.state.idx === 0 && e.deltaY < 0) {
                        // 第一个，向上
                    } else if (this.state.idx + 1 === this.props.children?.length && e.deltaY > 0) {
                        // 最后一个，向下
                    } else if (e.deltaY < 0) {
                        // 上一页
                        e.preventDefault();
                        this.prevPage();
                    } else if (e.deltaY > 0) {
                        // 下一页
                        e.preventDefault();
                        this.nextPage();
                    }
                    return;
                }

                if (!IsWheelEventValid(e)) {
                    // 登录 wheel 事件，排除其中连续触发的部分
                    return;
                }
                
                if (this.props.children?.length === 1) {
                    // 跳过
                    return;
                } else if (this.state.idx === 0 && e.deltaY < 0) {
                    // 第一个，向上
                    return;
                } else if (this.state.idx + 1 === this.props.children?.length && e.deltaY > 0) {
                    // 最后一个，向下
                    return;
                } else if (e.deltaY < 0) {
                    // 上一页
                    e.preventDefault();
                    this.prevPage();
                    return;
                } else if (e.deltaY > 0) {
                    // 下一页
                    e.preventDefault();
                    this.nextPage();
                    return;
                }
            }
        };
        
        this.keyDownEvent = ev => {
            if (!this.cdHolder && props.children && props.children.length > 1) {
                if (ev.key === "ArrowDown" && this.state.idx < props.children.length - 1) {
                    this.nextPage();
                    ev.stopPropagation();
                } else if (ev.key === "ArrowUp" && this.state.idx > 0) {
                    this.prevPage();
                    ev.stopPropagation();
                }
            }
        };

        this.container = React.createRef<HTMLDivElement>();

        this.cdHolder = false;
        this.aniDirection = "down";
        this.timers = [];

        this.touched = false;
        this.originY = 0;
    }

    public render(): JSX.Element {
        return (
            <div ref={ this.container } className="PageFlowContainer"
            style={{
                padding: this.props.style?.margin,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            onTouchStart={
                e => {
                    if (e.touches.length === 1) {
                        this.touched = true;
                        this.originY = e.touches[0].screenY;
                    }
                }
            }
            onTouchMove={
                e => {
                    if (this.props.children && this.touched && e.touches.length === 1) {
                        const y = e.touches[0].screenY - this.originY;
                        if (Math.abs(y) >= window.innerHeight / 10) {
                            if (y > 0) {
                                if (this.state.idx) {
                                    this.prevPage();
                                    this.originY = e.touches[0].screenY;
                                }
                            } else {
                                if (this.state.idx + 1 < this.props.children.length) {
                                    this.nextPage();
                                    this.originY = e.touches[0].screenY;
                                }
                            }
                        }
                    }
                }
            }
            onTouchEnd={
                () => {
                    this.touched = false;
                }
            } >
                <div key="box"
                style={{
                    // border: "1px solid white",
                    ...this.props.style,
                    height: this.props.height,
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    margin: 0
                }} >
                {
                    this.props.children?.length ? this.props.children[this.state.idx] : null
                }
                </div>
                {
                    this.props.children?.length || 0 > 1 ? (
                        <div key="navi"
                        style={{
                            // border: "1px solid white",
                            width: "20px",
                            height: "40%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 calc(0.6vw + 6px) 0 calc(-0.6vw - 26px)",
                            pointerEvents: "none"
                        }} >
                        {
                            this.props.children!.map((_, i) => {
                                return (
                                    <div key={ i }
                                    style={{
                                        display: "block",
                                        width: "6px",
                                        height: "6px",
                                        margin: "6px 4px",
                                        background: `rgba(255,255,255,${
                                            i === this.state.idx ? 1 : 0.2
                                        })`,
                                        border: "1px solid rgb(255,255,255)",
                                        borderRadius: "3px",
                                        pointerEvents: "all",
                                        cursor: "pointer"
                                    }}
                                    onClick={
                                        () => {
                                            if (i !== this.state.idx) {
                                                this.aniDirection = (
                                                    i < this.state.idx
                                                ) ? "down" : "up";
                                                return this.shiftTo(i);
                                            }
                                        }
                                    } />
                                );
                            })
                        }
                        </div>
                    ) : null
                }
            </div>
        );
    }

    protected clearTimers(): void {
        this.timers.forEach(timer => {
            clearTimeout(timer);
        });

        this.timers = [];
    }

    protected resetListener(): void {
        document.body.removeEventListener(
            "wheel",
            this.wheelEvent
        );
        
        document.body.addEventListener(
            "wheel",
            this.wheelEvent, {
                passive: false
            }
        );
    }

    public componentDidMount(): void {
        document.body.addEventListener(
            "wheel",
            this.wheelEvent, {
                passive: false
            }
        );
        document.body.addEventListener(
            "keydown",
            this.keyDownEvent
        );
        
        this.resetListener();
    }

    public componentDidUpdate(): void {
        this.resetListener();

        if (this.container.current) {
            const content = this.container.current.firstElementChild!.firstElementChild! as HTMLElement;
            content.style.opacity = `0`;
            for (let t: number = 0; t < 160; t += 10) {
                this.timers.push(
                    setTimeout(() => {
                        if (content) {
                            content.style.transform = `translateY(${ (
                                this.aniDirection === "up" ? 1 : -1
                            ) * (160 - Math.min(
                                160, t + 10
                            )) }px)`;
                            content.style.opacity = `${ Math.min(1, Math.max(t - 30, 0) / 120) }`;
                        }
                    }, t)
                );
            }
        }
    }

    public componentWillUnmount(): void {
        this.clearTimers();
        document.body.removeEventListener("wheel", this.wheelEvent);
        document.body.removeEventListener("keydown", this.keyDownEvent);
    }

    public shiftTo(idx: number): number {
        if (!this.props.children || this.cdHolder) {
            return -1;
        }

        const to: number = Math.min(
            this.props.children?.length - 1,
            Math.max(
                0, idx
            )
        );

        this.cdHolder = true;
        this.timers.push(
            setTimeout(() => {
                this.cdHolder = false;
                UnsubscribeWheelEvent();
            }, 360)
        );

        if (this.container.current) {
            const content = this.container.current.firstElementChild!.firstElementChild! as HTMLElement;
            for (let t: number = 0; t < 160; t += 10) {
                this.timers.push(
                    setTimeout(() => {
                        if (content) {
                            content.style.transform = `translateY(${ (
                                this.aniDirection === "up" ? -1 : 1
                            ) * t * 2 }px)`;
                            content.style.opacity = `${ 1 - t / 160 }`;
                        }
                    }, t)
                );
            }
        }

        this.timers.push(
            setTimeout(() => {
                this.setState({
                    idx: to
                });
            }, 160)
        );

        return to;
    }

    public nextPage(): number {
        this.aniDirection = "up";
        const to: number = this.state.idx + 1;
        return this.shiftTo(to);
    }

    public prevPage(): number {
        this.aniDirection = "down";
        const to: number = this.state.idx - 1;
        return this.shiftTo(to);
    }

};
