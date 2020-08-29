/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 20:55:09 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-29 22:50:27
 */

import { Component } from "react";


/**
 * 当定义一个页面主体的元素时，
 * 使用 PageBody 类型代表一个接受空 props 初始化的 React 组件.
 * 
 * @export
 * @class PageBody
 * @extends {Component<{}, S>}
 * @template S 组件的 state 的类型
 */
export class PageBody<S> extends Component<{}, S> {};

/**
 * 页面的配色方案.
 *
 * @export
 * @interface Colortab
 */
export interface Colortab {
    color: string;
    border: string;
    background: string;
    frontground: string;
};

/**
 * 为页面指定的配色方案和背景的绘制动画.
 *
 * @export
 * @interface Theme
 * @template T 组件绘制过程中记录的数据的结构
 */
export interface Theme<T=any> {
    /**
     * 配色方案.
     */
    colortab: Colortab;
    /**
     * 绘制下一帧的定时器.
     */
    next?: NodeJS.Timeout;
    /**
     * 组件绘制过程中记录的数据.
     */
    data: T;
    /**
     * 开始绘制.
     */
    start: (ctx: CanvasRenderingContext2D, ctx2: CanvasRenderingContext2D) => void;
    /**
     * 绘制一帧.
     */
    paint: (ctx: CanvasRenderingContext2D, ctx2: CanvasRenderingContext2D) => void;
    /**
     * 结束绘制.
     */
    end: () => void;
    /**
     * 鼠标交互.
     */
    mouseListener: (e: JQuery.MouseEventBase) => void;
    /**
     * 触屏交互.
     */
    touchListener: (e: JQuery.TouchEventBase) => void;
};


/**
 * 粒子特效.
 *
 * @export
 * @interface Partical
 */
export interface Partical {
    color: {
        r: number;
        g: number;
        b: number;
    } | string;
    animation: {
        x: (ms: number) => number;
        y: (ms: number) => number;
        opacity: (ms: number) => number;
        size: (ms: number) => number;
    };
    ms: number;
    life: number;
};
