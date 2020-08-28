/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 21:37:20 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-29 00:29:43
 */

import { Theme } from "../methods/typedict";
import { BackgroundCanvasRenderingFPS } from "../methods/constants";


interface SnowBall {
    r: number;
    x: number;
    y: number;
    a: number;
    dist: number;
    prevDx: number;
    prevDd: number;
};

interface YukiState {
    items: Array<SnowBall>;
};

/** 主题：雪 */
export const Yuki: Theme<YukiState> = {
    colortab: {
        color: "rgb(208,213,215)",
        border: "rgb(155,255,254)"
    },
    data: {
        items: []
    },
    start: (ctx: CanvasRenderingContext2D) => {
        Yuki.data = {
            items: []
        };
        Yuki.paint(ctx);
    },
    end: () => {
        if (Yuki.next) {
            // 清除定时器
            clearTimeout(Yuki.next);
            Yuki.next = void 0;
        }
        Yuki.data = {
            items: []
        };
    },
    paint: (ctx: CanvasRenderingContext2D) => {
        /** 到下一帧的间隔毫秒数 */
        const span: number = 1000 / BackgroundCanvasRenderingFPS;
        const width: number = ctx.canvas.width;
        const height: number = ctx.canvas.height;
        const max: number = Math.sqrt(width * height) / 16;

        // 绘制和更新
        ctx.fillStyle = "rgb(11,11,14)";
        ctx.fillRect(0, 0, width, height);

        let nextList: Array<SnowBall> = [];

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

        // 下一帧状态
        Yuki.data.items = [...nextList];
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
                    prevDd: 0
                });
            }
        }
        
        // 更新定时器
        Yuki.next = setTimeout(() => {
            Yuki.paint(ctx);
        }, span);
    }
};
