/*
 * @Author: Kanata You 
 * @Date: 2020-09-30 09:52:57 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-30 10:52:52
 */

import React from "react";
import { Shared } from "../methods/globals";
import { ResponsiveComponent } from "../compo/ResponsiveComponent";


export class Opening extends ResponsiveComponent {

    protected scale: number;

    protected div: React.RefObject<HTMLDivElement>;
    protected canvas: React.RefObject<HTMLCanvasElement>;
    protected ctx: CanvasRenderingContext2D | null;

    protected timers: Array<NodeJS.Timeout>;
    
    public constructor(props: {}) {
        super(props);
        this.state = {};

        this.scale = 1;

        this.div = React.createRef<HTMLDivElement>();
        this.canvas = React.createRef<HTMLCanvasElement>();
        this.ctx = null;

        this.timers = [];
    }

    public render(): JSX.Element {
        return (
            <div ref={ this.div }
            style={{
                zIndex: 1999,
                position: "fixed",
                opacity: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgb(255,250,253)",
                top: 0,
                left: 0
            }} >
                <canvas ref={ this.canvas }
                style={{
                    width: 1600,
                    height: 900,
                    border: "1px solid",
                    transform: "translate(-50%, -50%)",
                    position: "relative"
                }} />
            </div>
        );
    }

    public componentDidMountRE(): void {
        Shared.opening = this;
        
        if (this.canvas.current) {
            this.ctx = this.canvas.current.getContext("2d");
        }
    }

    public componentWillResize(W: number, H: number): boolean {
        if (this.canvas.current) {
            this.scale = Math.min(W / 1600, H / 900) * 0.7;
            this.canvas.current.style.transform = `translate(-50%, -50%) scale(${ this.scale })`;
            this.canvas.current.style.top = `${ H / 2 }px`;
            this.canvas.current.style.left = `${ W / 2 }px`;
        }

        return true;
    }

    protected clearTimers(): void {
        this.timers.forEach(timer => {
            clearTimeout(timer);
        });

        this.timers = [];
    }

    protected paint(x: number, y: number): void {
        for (let t: number = 0; t < 100; t += 10) {
            this.timers.push(
                setTimeout(() => {
                    if (this.ctx) {
                        const a: number = (10 + t) / 20 * this.scale;
                        this.ctx.fillStyle = "rgb(212,160,97)";
                        this.ctx.fillRect(x - a / 2, y - a / 2, a, a);
                    }
                }, t)
            );
        }
    }

    public play(): void {
        if (this.div.current) {
            this.div.current.style.display = "unset";
            this.div.current.style.opacity = "1";
        }

        let points: Array<[number, number]> = [];

        for (let i: number = 0; i < 400; i++) {
            points.push([
                300 + Math.random() * 1000,
                200 + Math.random() * 500
            ]);
        }

        const steps: number = 1600 / 40;
        const p: number = Math.ceil(points.length / steps);

        for (let t: number = 600; t < 2200; t += 40) {
            this.timers.push(
                setTimeout(() => {
                    for (let i: number = 0; i < p && points.length; i++) {
                        const point = points.shift()!;
                        this.paint(point[0], point[1]);
                    }
                }, t)
            );
        }

        this.timers.push(
            setTimeout(() => {
                if (this.div.current) {
                    this.div.current.style.opacity = "0";
                    this.div.current.style.display = "none";
                }
            }, 3000)
        );
    }

};
