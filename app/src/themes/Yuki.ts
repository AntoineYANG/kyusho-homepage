/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 21:37:20 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-29 18:36:25
 */

import { Theme, Partical } from "../methods/typedict";
import $ from "jquery";
import { BackgroundCanvasRenderingFPS } from "../methods/constants";
import { getSelectedElement } from "../methods/selection";
import Color from "../preference/Color";


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
        color: "rgb(208,213,215)",
        border: "rgb(155,255,254)"
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
        const span: number = 1000 / BackgroundCanvasRenderingFPS;
        const width: number = ctx.canvas.width;
        const height: number = ctx.canvas.height;
        const max: number = Math.sqrt(width * height) / 16;

        // 绘制和更新
        ctx.fillStyle = "rgb(11,11,14)";
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
            ) / BackgroundCanvasRenderingFPS;
            let ri: number = Math.pow(dx, 2) / Math.pow(
                Math.abs(dx) + Math.abs(
                    item.prevDx * BackgroundCanvasRenderingFPS / 2
                ), 2
            );
            dx = ri * dx + (1 - ri) * item.prevDx;
            item.x += dx * (1 - item.dist);
            item.prevDx = dx;
            item.y += (
                1 + 4 * r / BackgroundCanvasRenderingFPS
            ) * height / 1600 * (1 + item.y / height * 0.4);
            if (item.y - r <= height) {
                // 留下来
                let dd: number = (Math.random() - 0.5) * 0.005;
                let ri: number = Math.pow(dd, 2) / Math.pow(
                    Math.abs(dd) + Math.abs(
                        item.prevDd * BackgroundCanvasRenderingFPS / 2
                    ), 2
                );
                dd = ri * dd + (1 - ri) * item.prevDd;
                item.dist += dd;
                item.prevDd = dd;
                const a: number = Math.min(1, 1 - 0.2 * item.dist);
                if (item.a < a) {
                    item.a += Math.random() * 0.16 / BackgroundCanvasRenderingFPS;
                }
                item.a = Math.min(item.a, a);
                nextList.push(item);
            }
        });

        Yuki.data.particals.forEach(p => {
            if (typeof p.color === "string") {
                ctx2.fillStyle = p.color;
                ctx2.globalAlpha = p.animation.opacity(p.ms);
            } else {
                ctx2.globalAlpha = 1;
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

        // 鼠标指针
        if (Yuki.data.cursor) {
            ctx2.strokeStyle = "rgb(23,126,209)";
            ctx2.lineWidth = 1;
            ctx2.beginPath();
            ctx2.moveTo(Yuki.data.cursor.x, Yuki.data.cursor.y);
            ctx2.lineTo(Yuki.data.cursor.x + 16, Yuki.data.cursor.y + 16);
            ctx2.lineTo(Yuki.data.cursor.x + 6, Yuki.data.cursor.y + 22);
            ctx2.lineTo(Yuki.data.cursor.x, Yuki.data.cursor.y);
            ctx2.stroke();
        }

        // 下一帧状态
        Yuki.data.items = [...nextList];
        Yuki.data.particals = [...nextParticals];
        /** 再生成一个光球的概率指数 */
        let possibility: number = (
            max - Yuki.data.items.length
        ) / max * 3 / BackgroundCanvasRenderingFPS;

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
            if (selection && selection.style.color) {
                let colorSet: Array<string> | null = Color.toRgb(
                    selection.style.color
                ).match(/\d+/g);
                if (colorSet?.length === 3) {
                    color2 = `rgb(${ colorSet[0] },${ colorSet[1] },${ colorSet[2] })`;
                } else {
                    color2 = selection.style.color;
                }
            } else {
                color2 = color;
            }
            const lightness: number = Color.toHsl(color).l * 0.9;
            const lightness2: number = Color.toHsl(color2).l * 0.9;

            for (let i: number = 0; i < 6; i++) {
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
            for (let i: number = 0; i < 9; i++) {
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
                        1000 / BackgroundCanvasRenderingFPS
                    )) {
                        setTimeout(() => {
                            if (item) {
                                item.y -= (
                                    1 + 4 * item.r * item.dist / BackgroundCanvasRenderingFPS
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
                const x: number = e.touches[j].clientX;
                const y: number = e.touches[j].clientY;
                for (let i: number = 0; i < 6; i++) {
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
                for (let i: number = 0; i < 9; i++) {
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
                            1000 / BackgroundCanvasRenderingFPS
                        )) {
                            setTimeout(() => {
                                if (item) {
                                    item.y -= (
                                        1 + 4 * item.r * item.dist / BackgroundCanvasRenderingFPS
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
