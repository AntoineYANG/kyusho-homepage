/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 20:55:09 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-29 00:27:39
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
    start: (ctx: CanvasRenderingContext2D) => void;
    /**
     * 绘制一帧.
     */
    paint: (ctx: CanvasRenderingContext2D) => void;
    /**
     * 结束绘制.
     */
    end: () => void;
};
