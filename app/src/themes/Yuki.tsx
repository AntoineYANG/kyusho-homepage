/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 21:37:20 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-15 11:53:08
 */

import { Theme, Partical } from "../methods/typedict";
import $ from "jquery";
import { getSelectedElement, getStyle } from "../methods/selection";
import Color from "../preference/Color";
import { Shared } from "../methods/globals";
import { renderingState } from "./BackgroundCanvas";
import React from "react";
import { CanvasRenderingEvent, BilibiliFlvEventLog } from "../compo/BilibiliFlv";


interface SnowBall {
    r: number;
    x: number;
    y: number;
    a: number;
    dist: number;
    prevDx: number;
    prevDd: number;
    active: boolean;
};

interface YukiState {
    items: Array<SnowBall>;
    particals: Array<Partical>;
    cursor?: { x: number; y: number; pressed: boolean; };
};

/** 主题：雪 */
export const Yuki: Theme<YukiState> = {
    colortab: {
        base: "rgb(11,11,14)",
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
    data: {
        items: [],
        particals: []
    },
    start: (ctx: CanvasRenderingContext2D, ctx2: CanvasRenderingContext2D) => {
        ctx.canvas.style.backgroundColor = "rgb(11,11,14)";
        Yuki.data = {
            items: [],
            particals: [],
            cursor: void 0
        };
        Yuki.paint(ctx, ctx2);
    },
    end: () => {
        if (Yuki.next) {
            // 清除定时器
            clearTimeout(Yuki.next);
            Yuki.next = void 0;
        }
        Yuki.data = {
            items: [],
            particals: [],
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
        const max: number = Math.sqrt(width * height) / 16;

        // 绘制和更新
        ctx.fillStyle = Yuki.colortab.base;
        ctx.fillRect(0, 0, width, height);
        ctx2.clearRect(0, 0, width, height);

        let nextList: Array<SnowBall> = [];
        let nextParticals: Array<Partical> = [];

        Yuki.data.items.forEach(item => {
            const r: number = item.r * item.dist;
            if (r <= 0) {
                // 消失
                const r: number = 0.23 * max;
                const gradient: CanvasGradient = ctx.createRadialGradient(
                    item.x, item.y, r * 0.6, item.x, item.y, r
                );
                gradient.addColorStop(0, `rgba(212,215,217,${ item.a })`);
                gradient.addColorStop(0.6, `rgba(181,183,184,${ item.a * 0.6 })`);
                gradient.addColorStop(1, `rgba(72,73,74,${ item.a * 0.1 })`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(item.x, item.y - r);
                ctx.lineTo(item.x + r / 25, item.y - r / 25);
                ctx.lineTo(item.x + r, item.y);
                ctx.lineTo(item.x + r / 25, item.y + r / 25);
                ctx.lineTo(item.x, item.y + r);
                ctx.lineTo(item.x - r / 25, item.y + r / 25);
                ctx.lineTo(item.x - r, item.y);
                ctx.lineTo(item.x - r / 25, item.y - r / 25);
                ctx.lineTo(item.x, item.y - r);
                ctx.fill();
                ctx.closePath();
                return;
            }

            const gradient: CanvasGradient = ctx.createRadialGradient(
                item.x, item.y, r * 0.3, item.x, item.y, r
            );
            gradient.addColorStop(0, `rgba(212,215,217,${ item.a })`);
            gradient.addColorStop(0.6, `rgba(181,183,184,${ item.a * 0.6 })`);
            gradient.addColorStop(1, `rgba(72,73,74,${ item.a * 0.1 })`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(item.x, item.y, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            // 移动
            let dx: number = (
                (Math.random() - 0.5) * width / 36
            ) / Shared.animationFPS;
            let ri: number = Math.pow(dx, 2) / Math.pow(
                Math.abs(dx) + Math.abs(
                    item.prevDx * Shared.animationFPS / 2
                ), 2
            );
            dx = ri * dx + (1 - ri) * item.prevDx;
            item.x += dx * (1 - item.dist);
            item.prevDx = dx;
            item.y += (
                1 + 4 * r / Shared.animationFPS
            ) * height / 1600 * (1 + item.y / height * 0.4);
            if (item.y - r <= height) {
                // 留下来
                let dd: number = (Math.random() - 0.5) * 0.005;
                let ri: number = Math.pow(dd, 2) / Math.pow(
                    Math.abs(dd) + Math.abs(
                        item.prevDd * Shared.animationFPS / 2
                    ), 2
                );
                dd = ri * dd + (1 - ri) * item.prevDd;
                item.dist += dd;
                item.prevDd = dd;
                const a: number = Math.min(1, 1 - 0.2 * item.dist);
                if (item.a < a) {
                    item.a += Math.random() * 0.16 / Shared.animationFPS;
                }
                item.a = Math.min(item.a, a);
                nextList.push(item);
            }
        });

        if (Shared.particalEffects) {
            Yuki.data.particals.forEach(p => {
                if (typeof p.color === "string") {
                    ctx2.fillStyle = p.color;
                    ctx2.globalAlpha = p.animation.opacity(p.ms) * Shared.particalOpacity;
                } else {
                    ctx2.globalAlpha = Shared.particalOpacity;
                    ctx2.fillStyle = `rgba(${ p.color.r },${ p.color.g },${ p.color.b },${
                        p.animation.opacity(p.ms)
                    })`;
                }
                ctx2.fillRect(
                    p.animation.x(p.ms),
                    p.animation.y(p.ms),
                    p.animation.size(p.ms),
                    p.animation.size(p.ms)
                );
    
                p.ms += span;
                if (p.animation.opacity(p.ms) > 0) {
                    // 还未结束
                    nextParticals.push(p);
                }
            });
        }

        // 鼠标指针
        if (Yuki.data.cursor && Shared.cursorState !== "origin" ) {
            ctx2.globalAlpha = 1;
            ctx2.strokeStyle = "rgb(8,36,76)";
            ctx2.lineWidth = 3;
            ctx2.beginPath();
            ctx2.moveTo(Yuki.data.cursor.x + 1, Yuki.data.cursor.y + 1);
            ctx2.lineTo(Yuki.data.cursor.x + 17, Yuki.data.cursor.y + 17);
            ctx2.lineTo(Yuki.data.cursor.x + 7, Yuki.data.cursor.y + 23);
            ctx2.lineTo(Yuki.data.cursor.x + 1, Yuki.data.cursor.y + 1);
            ctx2.stroke();
            if (Shared.cursorState === "normal") {
                ctx2.strokeStyle = "rgb(23,126,209)";
                ctx2.lineWidth = 1;
                ctx2.beginPath();
                ctx2.moveTo(Yuki.data.cursor.x, Yuki.data.cursor.y);
                ctx2.lineTo(Yuki.data.cursor.x + 16, Yuki.data.cursor.y + 16);
                ctx2.lineTo(Yuki.data.cursor.x + 6, Yuki.data.cursor.y + 22);
                ctx2.lineTo(Yuki.data.cursor.x, Yuki.data.cursor.y);
                ctx2.stroke();
            } else if (Shared.cursorState === "pointer") {
                ctx2.strokeStyle = "rgb(23,126,209)";
                ctx2.fillStyle = `rgba(136,220,254,${
                    Math.abs(
                        (new Date()).getTime() % 2000 - 1000
                    ) % 1000 / 1000
                })`;
                ctx2.lineWidth = 1;
                ctx2.beginPath();
                ctx2.moveTo(Yuki.data.cursor.x, Yuki.data.cursor.y);
                ctx2.lineTo(Yuki.data.cursor.x + 16, Yuki.data.cursor.y + 16);
                ctx2.lineTo(Yuki.data.cursor.x + 6, Yuki.data.cursor.y + 22);
                ctx2.lineTo(Yuki.data.cursor.x, Yuki.data.cursor.y);
                ctx2.fill();
                ctx2.stroke();
            }
        }

        // 下一帧状态
        Yuki.data.items = [...nextList];
        Yuki.data.particals = [...nextParticals];
        /** 再生成一个光球的概率指数 */
        let possibility: number = (
            max - Yuki.data.items.length
        ) / max * 3 / Shared.animationFPS;

        while (possibility > 0) {
            possibility -= Math.random();

            if (possibility > 0) {
                Yuki.data.items.push({
                    x: Math.random() * width,
                    y: Math.random() * height * 0.2,
                    r: (Math.random() * 0.25 + 0.09) * max,
                    a: Math.random() * 0.03 + 0.02,
                    dist: 0.7 - Math.random() * Math.random() * 0.3,
                    prevDx: 0,
                    prevDd: 0,
                    active: true
                });
            }
        }
        
        // 更新定时器
        Yuki.next = setTimeout(() => {
            Yuki.paint(ctx, ctx2);
        }, span);
    },
    mouseListener: (e: JQuery.MouseEventBase) => {
        if (e.type === "mouseout") {
            Yuki.data.cursor = {
                x: e.clientX,
                y: e.clientY,
                pressed: Yuki.data.cursor?.pressed || false
            };
        } else if (e.type === "mouseover" || e.type === "mousemove") {
            Yuki.data.cursor = {
                x: e.clientX,
                y: e.clientY,
                pressed: Yuki.data.cursor?.pressed || false
            };
        } else if (e.type === "mousedown") {
            Yuki.data.cursor = {
                x: e.clientX,
                y: e.clientY,
                pressed: true
            };
        } else if (e.type === "mouseup") {
            Yuki.data.cursor = {
                x: e.clientX,
                y: e.clientY,
                pressed: false
            };
        }
        if (Yuki.data.cursor?.pressed) {
            // 粒子效果
            if (Shared.particalEffects) {
                const x: number = e.clientX;
                const y: number = e.clientY;
                const color: string = Color.interpolate(
                    `rgb(63,192,252)`,
                    `rgb(193,62,69)`,
                    (Math.random() * 0.2 + 0.8) * Math.min(
                        1, Yuki.data.particals.length / 2400
                    )
                );
                // 根据被选择的元素变更颜色
                const selection: HTMLElement | null = getSelectedElement();
                let color2: string = `rgb(63,192,252)`;
                if (selection && (
                    // 这里直接赋值给 color2，判断是否为空串
                    color2 = (
                        selection.nodeName === "text"
                        || selection.nodeName === "tspan"
                    ) ? getStyle(selection, "fill")
                    : getStyle(selection, "color")
                )) {
                    // 操作已在 if 条件中完成
                } else {
                    color2 = color;
                }
                const lightness: number = Color.toHsl(color).l * 0.9;
                const lightness2: number = Color.toHsl(color2).l * 0.9;
    
                for (let i: number = 0; i < (
                    Shared.particalEffects === 1 ? 2
                        : Shared.particalEffects === 2 ? 6
                            : 10
                ); i++) {
                    /** x 方向运动速度(每秒移动距离) */
                    let sx: number = (Math.random() * 2 - 1) * 120;
                    sx += (sx > 0 ? 1 : -1) * 24 * Math.random();
                    /** y 方向初始运动速度(每秒移动距离) */
                    const sy: number = 0 - Math.random() * Math.random() * 256 - 128;
    
                    /** 颜色 */
                    const c: string = Math.random() < 0.8 ? color : color2;
                    const l: number = c === color ? lightness : lightness2;
    
                    Yuki.data.particals.push({
                        color: c === color ? Color.getRgba(
                            Color.setLightness(
                                c,
                                l + (1 - l) * Math.random() * 0.6
                            )
                        ) : c,
                        animation: {
                            x: ms => x + sx * ms / 1000,
                            y: ms => y + sy * ms / 1000 + ms * ms / 1200,
                            opacity: ms => 1 - 0.6 * ms / 400,
                            size: ms => 6 - 1.5 * ms / 400
                        },
                        life: 400,
                        ms: 0
                    });
                }
                for (let i: number = 0; i < (
                    Shared.particalEffects === 1 ? 3
                        : Shared.particalEffects === 2 ? 9
                            : 14
                ); i++) {
                    /** x 方向运动速度(每秒移动距离) */
                    let sx: number = (Math.random() * 2 - 1) * 140;
                    sx += (sx > 0 ? 1 : -1) * 28 * Math.random();
                    /** y 方向初始运动速度(每秒移动距离) */
                    const sy: number = 0 - Math.random() * Math.random() * 282 - 141;
                    
                    /** 颜色 */
                    const c: string = Math.random() < 0.8 ? color : color2;
                    const l: number = c === color ? lightness : lightness2;
    
                    Yuki.data.particals.push({
                        color: c.startsWith("rgb") ? Color.getRgba(
                            Color.setLightness(
                                c,
                                l * 0.6 + (1 - l * 0.6) * Math.random() * 0.5
                            )
                        ) : c,
                        animation: {
                            x: ms => x + sx * ms / 1000,
                            y: ms => y + sy * ms / 1000 + ms * ms / 2000,
                            opacity: ms => 1 - 0.6 * ms / 400,
                            size: ms => 4 - 1 * ms / 400
                        },
                        life: 400,
                        ms: 0
                    });
                }
            }

            // 元素交互
            for (let i: number = 0; i < Yuki.data.items.length; i++) {
                if (!Yuki.data.items[i].active) {
                    continue;
                }
                const d2: number = Math.pow(
                    Yuki.data.items[i].x - e.clientX, 2
                ) + Math.pow(
                    Yuki.data.items[i].y - e.clientY, 2
                );
                if (d2 <= Math.pow(Yuki.data.items[i].r, 2)) {
                    const item: SnowBall = Yuki.data.items[i];
                    // 防抖
                    item.active = false;
                    setTimeout(() => {
                        if (item) {
                            item.active = true;
                        }
                    }, 2000);
                    for (let t: number = 0; t < 2600; t += Math.floor(
                        1000 / Shared.animationFPS
                    )) {
                        setTimeout(() => {
                            if (item) {
                                item.y -= (
                                    1 + 4 * item.r * item.dist / Shared.animationFPS
                                ) * Math.sqrt(2600 - t) * $(window).height()! / 40000;
                            }
                        }, t);
                    }
                }
            }
        }
    },
    touchListener: (e: JQuery.TouchEventBase) => {
        Yuki.data.cursor = void 0;
        if (e.touches.length) {
            for (let j: number = 0; j < e.touches.length; j++) {
                // 粒子效果
                if (Shared.particalEffects) {
                    const x: number = e.touches[j].clientX;
                    const y: number = e.touches[j].clientY;
                    for (let i: number = 0; i < (
                        Shared.particalEffects === 1 ? 2
                            : Shared.particalEffects === 2 ? 5
                                : 8
                    ); i++) {
                        /** x 方向运动速度(每秒移动距离) */
                        let sx: number = (Math.random() * 2 - 1) * 100;
                        sx += (sx > 0 ? 1 : -1) * 20 * Math.random();
                        /** y 方向初始运动速度(每秒移动距离) */
                        const sy: number = 0 - Math.random() * Math.random() * 256 - 128;
        
                        Yuki.data.particals.push({
                            color: {
                                r: 63,
                                g: 192 + Math.floor(Math.random() * 30),
                                b: 252
                            },
                            animation: {
                                x: ms => x + sx * ms / 1000,
                                y: ms => y + sy * ms / 1000 + ms * ms / 1600,
                                opacity: ms => 1 - 0.4 * ms / 400,
                                size: ms => 6 - 1.5 * ms / 400
                            },
                            life: 400,
                            ms: 0
                        });
                    }
                    for (let i: number = 0; i < (
                        Shared.particalEffects === 1 ? 3
                            : Shared.particalEffects === 2 ? 7
                                : 10
                    ); i++) {
                        /** x 方向运动速度(每秒移动距离) */
                        let sx: number = (Math.random() * 2 - 1) * 120;
                        sx += (sx > 0 ? 1 : -1) * 24 * Math.random();
                        /** y 方向初始运动速度(每秒移动距离) */
                        const sy: number = 0 - Math.random() * Math.random() * 282 - 141;
        
                        Yuki.data.particals.push({
                            color: {
                                r: 63,
                                g: 172 + Math.floor(Math.random() * 40),
                                b: 252
                            },
                            animation: {
                                x: ms => x + sx * ms / 1000,
                                y: ms => y + sy * ms / 1000 + ms * ms / 1200,
                                opacity: ms => 1 - 0.6 * ms / 400,
                                size: ms => 4 - 1 * ms / 400
                            },
                            life: 400,
                            ms: 0
                        });
                    }
                }
                
                // 元素交互
                for (let i: number = 0; i < Yuki.data.items.length; i++) {
                    if (!Yuki.data.items[i].active) {
                        continue;
                    }
                    const d2: number = Math.pow(
                        Yuki.data.items[i].x - e.touches[j].clientX, 2
                    ) + Math.pow(
                        Yuki.data.items[i].y - e.touches[j].clientY, 2
                    );
                    if (d2 <= Math.pow(Yuki.data.items[i].r, 2) + 11) {
                        const item: SnowBall = Yuki.data.items[i];
                        // 防抖
                        item.active = false;
                        setTimeout(() => {
                            if (item) {
                                item.active = true;
                            }
                        }, 2000);
                        for (let t: number = 0; t < 2600; t += Math.floor(
                            1000 / Shared.animationFPS
                        )) {
                            setTimeout(() => {
                                if (item) {
                                    item.y -= (
                                        1 + 4 * item.r * item.dist / Shared.animationFPS
                                    ) * Math.sqrt(2600 - t) * $(window).height()! / 40000;
                                }
                            }, t);
                        }
                    }
                }
            }
        }
    }
};
