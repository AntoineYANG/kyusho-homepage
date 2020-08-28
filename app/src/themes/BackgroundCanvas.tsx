/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 21:15:16 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-29 00:24:06
 */

import React, { Component } from "react";
import $ from "jquery";
import { Theme } from "../methods/typedict";


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

    protected canvas: React.RefObject<HTMLCanvasElement>;
    protected ctx?: CanvasRenderingContext2D;

    public constructor(props: BackgroundCanvasProps) {
        super(props);
        this.state = {
            curTheme: this.props.initTheme
        };

        this.canvas = React.createRef<HTMLCanvasElement>();
    }

    public render(): JSX.Element {
        return (
            <>
                <canvas ref={ this.canvas }
                width="100%" height="100%" style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: -9999
                }} />
                <>
                    { this.props.children }
                </>
            </>
        );
    }

    public componentDidMount(): void {
        // 设定大小
        this.canvas.current!.width = $(window).width()!;
        this.canvas.current!.height = $(window).height()!;
        // 获取 canvas 上下文
        this.ctx = this.canvas.current!.getContext("2d")!;
        // 绑定监听
        $(window).on("resize", () => {
            this.canvas.current!.width = $(window).width()!;
            this.canvas.current!.height = $(window).height()!;
        });
        // 开始渲染
        this.state.curTheme.start(this.ctx!);
    }

    public getSnapshotBeforeUpdate(): void {
        // 停止渲染
        this.state.curTheme.end();
    }

    public componentDidUpdate(): void {
        // 开始渲染
        this.state.curTheme.start(this.ctx!);
    }

};
