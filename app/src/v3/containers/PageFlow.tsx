/*
 * @Author: Kanata You 
 * @Date: 2020-09-24 14:06:26 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-06 02:01:02
 */

import React, { Component } from "react";


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

    protected container: React.RefObject<HTMLDivElement>;

    protected cdHolder: boolean;
    protected aniDirection: "up" | "down";
    protected timers: Array<NodeJS.Timeout>;

    public constructor(props: PageFlowProps) {
        super(props);
        this.state = {
            idx: 0
        };

        this.wheelEvent = () => void 0;

        this.container = React.createRef<HTMLDivElement>();

        this.cdHolder = false;
        this.aniDirection = "down";
        this.timers = [];
    }

    public render(): JSX.Element {
        return (
            <div ref={ this.container } className="PageFlowContainer"
            style={{
                padding: this.props.style?.margin,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }} >
                <div key="box"
                style={{
                    // border: "1px solid white",
                    ...this.props.style,
                    height: this.props.height,
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden auto",
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
                                        background: `rgba(${
                                            i === this.state.idx ? "207,162,92" : "245,245,245"
                                        },0.9)`,
                                        border: "1px solid #888",
                                        borderRadius: "3px",
                                        cursor: "pointer"
                                    }} />
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

        this.wheelEvent = (e: WheelEvent) => {
            if (this.container.current) {
                if (!this.container.current.firstElementChild!.firstElementChild) {
                    return;
                }

                if (this.cdHolder) {
                    e.preventDefault();
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
                            content.style.opacity = `${ Math.min(1, Math.max(t - 40, 0) / 120) }`;
                        }
                    }, t)
                );
            }
        }
    }

    public componentWillUnmount(): void {
        this.clearTimers();
        document.body.removeEventListener("wheel", this.wheelEvent);
    }

    public shiftTo(idx: number): number {
        if (!this.props.children) {
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
