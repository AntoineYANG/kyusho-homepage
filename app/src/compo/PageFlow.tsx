/*
 * @Author: Kanata You 
 * @Date: 2020-09-24 14:06:26 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-30 10:02:18
 */

import React, { Component } from "react";
import { Shared } from "../methods/globals";


export interface PageFlowProps {
    height: string | number;
    children: Array<JSX.Element>;
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
            <div ref={ this.container }
            style={{
                padding: this.props.style?.margin
            }} >
                <div
                style={{
                    // border: "1px solid white",
                    ...this.props.style,
                    height: this.props.height,
                    overflow: "hidden auto",
                    margin: 0
                }} >
                {
                    this.props.children[this.state.idx]
                }
                </div>
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
                const top: number = this.container.current.offsetTop - window.scrollY;
                const bottom: number = top + this.container.current.offsetHeight;

                if (Math.abs(this.container.current.offsetTop - window.scrollY) < 1) {
                    const content = this.container.current.firstElementChild!.firstElementChild! as HTMLElement;
                    
                    if (this.container.current.offsetHeight < content.offsetHeight) {
                        const scrollTop: number = this.container.current.firstElementChild!.scrollTop;

                        if (scrollTop === 0 && e.deltaY < 0) {
                            // 已在最上，继续向上
                        } else if (scrollTop + this.container.current.offsetHeight > (
                            content.offsetHeight + 60
                        )) {
                            // 已在最下，继续向下
                        } else {
                            return;
                        }
                    }

                    if (this.cdHolder) {
                        e.preventDefault();
                        return;
                    }
                    
                    if (this.props.children.length === 1) {
                        // 跳过
                        return;
                    } else if (this.state.idx === 0 && e.deltaY < 0) {
                        // 第一个，向上
                        return;
                    } else if (this.state.idx === this.props.children.length - 1 && e.deltaY > 0) {
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

                /* 看得见的高度 */
                const visible: number = Math.min(
                    window.innerHeight, bottom
                ) - Math.max(
                    0, top
                );

                if (visible >= Math.min(
                    this.container.current.offsetHeight, window.innerHeight
                ) * 0.4) {
                    if (e.deltaY > 0 && window.scrollY < this.container.current.offsetTop) {
                        e.preventDefault();
                        window.scrollTo(
                            window.scrollX,
                            this.container.current.offsetTop
                        );
                    } else if (e.deltaY < 0 && window.scrollY > this.container.current.offsetTop) {
                        e.preventDefault();
                        window.scrollTo(
                            window.scrollX,
                            this.container.current.offsetTop
                        );
                    }
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
            for (let t: number = 0; t < 240; t += Math.floor(1000 / Shared.animationFPS)) {
                this.timers.push(
                    setTimeout(() => {
                        if (content) {
                            content.style.transform = `translateY(${ (
                                this.aniDirection === "up" ? 1 : -1
                            ) * (240 - Math.min(
                                240, t + Math.floor(1000 / Shared.animationFPS)
                            )) }px)`;
                            content.style.opacity = `${ Math.min(1, Math.max(t - 50, 0) / 180) }`;
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
        const to: number = Math.min(
            this.props.children.length - 1,
            Math.max(
                0, idx
            )
        );

        this.cdHolder = true;
        this.timers.push(
            setTimeout(() => {
                this.cdHolder = false;
            }, 600)
        );

        if (this.container.current) {
            const content = this.container.current.firstElementChild!.firstElementChild! as HTMLElement;
            for (let t: number = 0; t < 240; t += Math.floor(1000 / Shared.animationFPS)) {
                this.timers.push(
                    setTimeout(() => {
                        if (content) {
                            content.style.transform = `translateY(${ (
                                this.aniDirection === "up" ? -1 : 1
                            ) * t * 2 }px)`;
                            content.style.opacity = `${ 1 - t / 240 }`;
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
            }, 250)
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
