/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 21:15:16 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-02 19:37:44
 */

import React, { Component } from "react";
import $ from "jquery";
import { Theme } from "../methods/typedict";
import { Shared } from "../methods/globals";


export interface BackgroundCanvasProps {
    initTheme: Theme;
};

export interface BackgroundCanvasState {
    curTheme: Theme;
};

/**
 * 这个组件将作为页面的背景，
 * 其定位不随页面移动.
 * 建议在页面其他元素的最外层渲染.
 * 
 * @export
 * @class BackgroundCanvas
 * @extends {Component<BackgroundCanvasProps, BackgroundCanvasState>}
 */
export class BackgroundCanvas extends Component<BackgroundCanvasProps, BackgroundCanvasState> {

    // 背景
    protected canvas: React.RefObject<HTMLCanvasElement>;
    protected ctx?: CanvasRenderingContext2D;

    // 鼠标
    protected canvas2: React.RefObject<HTMLCanvasElement>;
    protected ctx2?: CanvasRenderingContext2D;

    public constructor(props: BackgroundCanvasProps) {
        super(props);
        this.state = {
            curTheme: this.props.initTheme
        };

        this.canvas = React.createRef<HTMLCanvasElement>();
        this.canvas2 = React.createRef<HTMLCanvasElement>();
    }

    public render(): JSX.Element {
        return (
            <>
                <canvas key="animation" ref={ this.canvas }
                width="100%" height="100%" style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: -9999
                }} />
                <>
                    { this.props.children }
                </>
                <canvas key="cursor" ref={ this.canvas2 }
                width="100%" height="100%" style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 9999,
                    pointerEvents: "none"
                }} />
            </>
        );
    }

    public componentDidMount(): void {
        if (Shared.version === "2.x") {
            // 隐藏默认指针
            $("body").css("cursor", "none");
        }

        // 设定大小
        this.canvas.current!.width = $(window).width()!;
        this.canvas.current!.height = $(window).height()!;
        this.canvas2.current!.width = $(window).width()!;
        this.canvas2.current!.height = $(window).height()!;
        // 获取 canvas 上下文
        this.ctx = this.canvas.current!.getContext("2d")!;
        this.ctx2 = this.canvas2.current!.getContext("2d")!;
        // 绑定监听
        $(window).on("resize", () => {
            this.canvas.current!.width = $(window).width()!;
            this.canvas.current!.height = $(window).height()!;
            this.canvas2.current!.width = $(window).width()!;
            this.canvas2.current!.height = $(window).height()!;
        });
        $("*").on("mouseover", e => {
            this.state.curTheme.mouseListener(e);
        }).on("mouseout", e => {
            this.state.curTheme.mouseListener(e);
        }).on("click", e => {
            this.state.curTheme.mouseListener(e);
        }).on("mousedown", e => {
            this.state.curTheme.mouseListener(e);
        }).on("mouseup", e => {
            this.state.curTheme.mouseListener(e);
        }).on("mousemove", e => {
            this.state.curTheme.mouseListener(e);
        }).on("touchstart", e => {
            this.state.curTheme.touchListener(e);
        }).on("touchmove", e => {
            this.state.curTheme.touchListener(e);
        }).on("touchend", e => {
            this.state.curTheme.touchListener(e);
        });
        // 开始渲染
        this.state.curTheme.start(this.ctx!, this.ctx2!);
    }

    public componentWillUnmount(): void {
        // 还原默认指针
        $("body").css("cursor", "initial");
        // 解除监听
        $(window).unbind();
    }

    public getSnapshotBeforeUpdate(): void {
        // 停止渲染
        this.state.curTheme.end();
    }

    public componentDidUpdate(): void {
        // 开始渲染
        this.state.curTheme.start(this.ctx!, this.ctx2!);
    }

};


/** 记录绘制的时间 */
export const renderingState = {
    prev: (new Date()).getTime(),
    setTime: (val: number) => renderingState.prev = val,
    getTime: () => renderingState.prev
};
