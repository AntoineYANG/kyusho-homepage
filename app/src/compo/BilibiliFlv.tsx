/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-06 01:19:10 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-06 02:32:16
 */

import React, { Component } from "react";
import flvjs from "flv.js";
import { Shared } from "../methods/globals";


export interface BilibiliFlvProps {
    autoPlay?: boolean;
    url: string;
};

export interface BilibiliFlvState {};

/**
 * 基于 bilibili/flv.js 制作的组件.
 *
 * @export
 * @class BilibiliFlv
 * @extends {Component<BilibiliFlvProps, BilibiliFlvState>}
 */
export class BilibiliFlv extends Component<BilibiliFlvProps, BilibiliFlvState> {

    protected dom: React.RefObject<HTMLVideoElement>;
    protected control: React.RefObject<HTMLDivElement>;

    public constructor(props: BilibiliFlvProps) {
        super(props);
        this.state = {};

        this.dom = React.createRef<HTMLVideoElement>();
        this.control = React.createRef<HTMLDivElement>();
    }

    public render(): JSX.Element {
        return (
            <div>
                <video ref={ this.dom } autoPlay={ this.props.autoPlay }
                controls
                style={{
                    display: "block",
                    width: "100%"
                }}
                onMouseOver={
                    () => {
                        Shared.cursorState = "pointer";
                    }
                }
                onMouseOut={
                    () => {
                        Shared.cursorState = "normal";
                    }
                }
                onClick={
                    () => this.play()
                } >
                    Please update your browser to support HTML5 video.
                </video>
                {/* <div ref={ this.control }
                style={{
                    width: "100%",
                    backgroundColor: Shared.theme.colortab.base.replace(
                        "(", "a("
                    ).replace(
                        ")", ",0.8)"
                    ),
                    height: "4vh",
                    position: "relative",
                    top: "-4vh"
                }} >
                    
                </div> */}
            </div>
        );
    }

    public componentDidMount(): void {
        if (flvjs.isSupported() && this.dom.current) {
            const flvPlayer = flvjs.createPlayer({
                type: "mp4",
                url: this.props.url
            });
            flvPlayer.attachMediaElement(this.dom.current);
            flvPlayer.load(); //加载
        }
    }

    protected play(): void {
        if (!flvjs.isSupported() || !this.dom.current) {
            return;
        }
        if (this.dom.current.paused) {
            this.dom.current.play();
        } else {
            this.dom.current.pause();
        }
    }

};
