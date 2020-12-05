/*
 * @Author: Kanata You 
 * @Date: 2020-12-02 19:28:04 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-02 20:25:48
 */

import { Theme } from "../methods/typedict";
import { Shared } from "../methods/globals";
import { renderingState } from "./BackgroundCanvas";
import React from "react";
import { CanvasRenderingEvent, BilibiliFlvEventLog } from "../compo/BilibiliFlv";
import { Genshin } from "../constant/GenshinDesign";
import Color from "../preference/Color";


interface NormalV3State {
    cursor?: { x: number; y: number; pressed: boolean; };
};

/** 主题：标准（V3.x版本） */
export const NormalV3: Theme<NormalV3State> = {
    colortab: {
        base: "radial-gradient(rgb(165,243,203) 40px, rgb(86,173,126))",
        color: "rgb(208,213,215)",
        border: "rgb(155,255,254)",
        background: "rgb(154,154,155)",
        frontground: "rgb(254,231,111)",
        frontground2: "rgb(251,133,154)",
        frontground3: "rgb(198,49,43)"
    },
    videoController: {
        background: "rgba(54,54,54,0.9)",
    
        btnPlay: [(
            <circle
            cx="18" cy="18" r="16"
            style={{
                fill: "#00000000"
            }} />
        ), (
            <path d={
                "M11,8 L29,18 L11,28 Z"
            }
            style={{
                stroke: "rgb(217,217,215)",
                fill: "none"
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
                stroke: "rgb(217,217,215)",
                fill: "none"
            }} />
        )],
    
        color: "rgb(235,203,195)",
    
        progStyle: "rgb(90,124,212)",
    
        progressBase: (
            <rect y="15" height="6"
            style={{
                stroke: "rgb(217,217,215)",
                fill: "rgb(32,32,30)"
            }} />
        ),
        progressBuffer: (
            <rect y="15" height="6"
            style={{
                fill: "rgb(70,70,70)"
            }} />
        ),
        progressCurrent: (
            <rect y="15" height="6"
            style={{
                fill: "rgb(198,196,204)"
            }} />
        ),
        progressFlag: (
            <rect x="0" y="0" width="12" height="12"
            style={{
                transform: "translate(-6px, -6px)",
                fill: "rgb(171,171,171)",
                stroke: "rgb(250,250,250)"
            }} />
        ),
    
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
    
        canvasRender: (event: CanvasRenderingEvent) => {
            if (event.logs.length) {
                // 日志输出
                const time: number = (new Date()).getTime();
                const ft = (t: number) => (
                    1 - (time - t) / 3000
                );
                const y: number = event.h * 0.7;
                /** 3秒内产生的最后四条 */
                const logs: Array<BilibiliFlvEventLog & { dt: number; }> = event.logs.map(
                    log => {
                        return {
                            ...log,
                            dt: ft(log.time)
                        };
                    }
                ).filter(log => log.dt >= 0).sort((a, b) => b.dt - a.dt).slice(0, 4);
                if (logs.length) {
                    const fontSize: number = 4 + Math.min(event.w, event.h) / 36;
                    event.ctx.font = `${ fontSize }px normal source-code-pro`;
                    event.ctx.textAlign = "left";
                    event.ctx.textBaseline = "top";
    
                    logs.reverse().forEach((log, i) => {
                        event.ctx.globalAlpha = log.dt;
                        event.ctx.fillStyle = `rgba(100,100,100,0.5)`;
                        event.ctx.fillRect(
                            fontSize,
                            y + fontSize * i * 2,
                            event.w * 0.1 + fontSize * 6,
                            fontSize * 1.6
                        );
                        event.ctx.fillStyle = `rgb(245,245,245)`;
                        event.ctx.fillText((
                            log.type === "exitfullscreen" ? "exit fullscreen"
                                : log.type === "fullscreen" ? "fullscreen mode"
                                    : log.type === "mute" ? "mute"
                                        : log.type === "pause" ? "paused"
                                            : log.type === "play" ? "resume"
                                                : log.type === "relocate" ? (
                                                    log.next >= log.prev ? `fast forward ${
                                                        Math.round(log.next - log.prev)
                                                    } sec` : `backward ${
                                                        Math.round(log.prev - log.next)
                                                    } sec`
                                                ) : log.type === "setSpeed" ? `speed set to ${
                                                    log.next
                                                }` : log.type === "setVolume" ? `volume: ${
                                                    log.next.toFixed(2)
                                                }` : "unmute"
                        ), 8 + fontSize, y + fontSize * 0.3 + fontSize * i * 2);
                    });
    
                    event.ctx.globalAlpha = 1;
                }
            }
    
            if (event.dataState === "HAVE_FUTURE_DATA" || event.dataState === "HAVE_ENOUGH_DATA") {
                return;
            }
            if (event.dataState === "HAVE_NOTHING") {
                event.ctx.fillStyle = "rgba(39,37,40,0.9)";
                event.ctx.fillRect(0, 0, event.w, event.h);
            }
    
            // 加载特效：旋转
            const f = (val: number) => val / 8 * 2 * Math.PI;
            const x: number = event.w / 2;
            const y: number = event.h / 2;
            const d: number = Math.min(x, y) / 8;
            let r: number = d / 4;
            const t: number = 7 - Math.floor(
                ((
                    (new Date()).getMilliseconds()
                ) / 125)
            ) % 8;
            for (let i: number = 0; i < 8; i++) {
                const cx: number = x + Math.cos(f(i + t)) * d;
                const cy: number = y - Math.sin(f(i + t)) * d;
                
                event.ctx.fillStyle = `rgba(225,225,225,${ 1 - 0.1 * i })`;
                event.ctx.beginPath();
                event.ctx.arc(cx, cy, r, 0, Math.PI * 2);
                event.ctx.fill();
    
                r *= 0.9;
            }
        }
    },
    data: {},
    start: (ctx: CanvasRenderingContext2D, ctx2: CanvasRenderingContext2D) => {
        const index: 0 | 1 | 2 | 3 | 4 | 5 | 6 = Math.floor(
            (new Date()).getTime() / 1000
        ) % 7 as (
            0 | 1 | 2 | 3 | 4 | 5 | 6
        );
        const lastIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 = (index + 6) % 7 as (
            0 | 1 | 2 | 3 | 4 | 5 | 6
        );
        const offset: number = (new Date()).getTime() % 1000;
        const color = Genshin.getByIndex(index);
        const colorLast = Genshin.getByIndex(lastIndex);
        ctx.canvas.style.background = `radial-gradient(${
            Color.interpolate(
                colorLast[0], color[0], offset / 1000
            )
        } 40px, ${
            Color.interpolate(
                colorLast[1], color[1], offset / 1000
            )
        })`;
        NormalV3.data = {
            cursor: void 0
        };
        NormalV3.paint(ctx, ctx2);
    },
    end: () => {
        if (NormalV3.next) {
            // 清除定时器
            clearTimeout(NormalV3.next);
            NormalV3.next = void 0;
        }
        NormalV3.data = {
            cursor: void 0
        };
    },
    paint: (ctx: CanvasRenderingContext2D, ctx2: CanvasRenderingContext2D) => {
        /** 到下一帧的间隔毫秒数 */
        const span: number = 1000 / Shared.animationFPS;
        /** 绘制的时间 */
        const time: number = (new Date()).getTime();
        const realSpan: number = time - renderingState.getTime();
        Shared.realFPS = Math.round(
            1000 / realSpan
        );
        renderingState.setTime(time);

        if (Shared.autoFPS) {
            const ita: number = 0.1 / Shared.animationFPS;
            const u: number = (realSpan - span) / span;
            if (u <= 0.67) {
                Shared.animationFPS += 50 * (1.67 - u) / Shared.animationFPS;
            }
            Shared.animationFPS = Math.max(
                10, Math.min(
                    120, Math.floor(
                        (
                            Shared.animationFPS * (
                                1 - ita
                            )
                        ) + (
                            Shared.realFPS * 2
                        ) * ita
                    )
                )
            );
        }

        const width: number = ctx.canvas.width;
        const height: number = ctx.canvas.height;

        // 绘制和更新
        ctx2.clearRect(0, 0, width, height);

        const index: 0 | 1 | 2 | 3 | 4 | 5 | 6 = Math.floor(
            (new Date()).getTime() / 12000
        ) % 7 as (
            0 | 1 | 2 | 3 | 4 | 5 | 6
        );
        const lastIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 = (index + 6) % 7 as (
            0 | 1 | 2 | 3 | 4 | 5 | 6
        );
        const offset: number = (new Date()).getTime() % 12000;
        const value: number = offset < 2400 ? offset / 2400 : 1;
        const color = Genshin.getByIndex(index);
        const colorLast = Genshin.getByIndex(lastIndex);
        ctx.canvas.style.background = `radial-gradient(${
            Color.interpolate(
                colorLast[0], color[0], value, "rgb"
            )
        } 40px, ${
            Color.interpolate(
                colorLast[1], color[1], value, "rgb"
            )
        })`;
        
        // 更新定时器
        NormalV3.next = setTimeout(() => {
            NormalV3.paint(ctx, ctx2);
        }, span);
    },
    mouseListener: (e: JQuery.MouseEventBase) => {
        if (e.type === "mouseout") {
            NormalV3.data.cursor = {
                x: e.clientX,
                y: e.clientY,
                pressed: NormalV3.data.cursor?.pressed || false
            };
        } else if (e.type === "mouseover" || e.type === "mousemove") {
            NormalV3.data.cursor = {
                x: e.clientX,
                y: e.clientY,
                pressed: NormalV3.data.cursor?.pressed || false
            };
        } else if (e.type === "mousedown") {
            NormalV3.data.cursor = {
                x: e.clientX,
                y: e.clientY,
                pressed: true
            };
        } else if (e.type === "mouseup") {
            NormalV3.data.cursor = {
                x: e.clientX,
                y: e.clientY,
                pressed: false
            };
        }
    },
    touchListener: (e: JQuery.TouchEventBase) => {
        NormalV3.data.cursor = void 0;
        if (e.touches.length) {
            for (let j: number = 0; j < e.touches.length; j++) {}
        }
    }
};
