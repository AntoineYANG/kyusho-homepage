/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 20:55:09 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-15 11:41:58
 */

import { Component } from "react";
import { BilibiliFlvControlAppearance } from "../compo/BilibiliFlv";


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
 * 以"年+月"表示的时间.
 */
export type YearMonthLike = [string, string] | [number, number] | "-";

/**
 * 语言.
 */
export type Language = "JavaScript" | "TypeScript" | "C++" | "HTML" | "CSS" | "Other"
    | "Python";

/**
 * 语言的使用信息.
 */
export type LanguageInfo = {
    name: Language;
    rate: number;
};

/**
 * 技术.
 */
export type Tech = "Express" | "React" | "D3.js" | "JQuery" | "Leaflet" | "MapBox" | "axios"
    | "Other";

/**
 * 页面的配色方案.
 *
 * @export
 * @interface Colortab
 */
export interface Colortab {
    color: string;
    border: string;
    base: string;
    background: string;
    frontground: string;
    frontground2: string;
    frontground3: string;
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
     * 播放器组件外观替换件.
     */
    videoController: BilibiliFlvControlAppearance;
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

/**
 * 文章.
 */
export type Article = {
    title: string;
    data: string;
};

/**
 * 论文信息.
 */
export type PaperInfo = {
    authors: Array<string>;
    title: string;
    publishingPlace: string;
    year: number;
    pageRange?: string;
};

/**
 * 书签.
 */
export type Bookmark = {
    type: "tech" | "design" | "other";
    title: string;
    url: string;
};

export type Role = "individual" | "engineer" | "leader" | "collaborator" | "contributor";

/**
 * 作品 id.
 */
export type ProductId = string;

/**
 * 作品详细数据.
 */
export interface Product {
    name: string;
    id: string;
    role: Role;
    languages: Array<LanguageInfo>;
    techs: Array<Tech>;
    beginTime: YearMonthLike;
    closeTime: YearMonthLike;
    avatarURL: string;
    videoURL?: string;
    githubURL: string;
    description: string;
};
