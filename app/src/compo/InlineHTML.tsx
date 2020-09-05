/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-05 18:40:08 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-05 18:45:54
 */

import React, { Component } from "react";


export interface InlineHTMLProps {
    html: string;
};
/**
 * 这个组件用于新建一个 div 元素内联 html, 
 * 将 html 字符串转化为 DOM 元素.
 *
 * @export
 * @class InlineHTML
 * @extends {Component<InlineHTMLProps, {}>}
 */
export class InlineHTML extends Component<InlineHTMLProps, {}> {

    protected ref: React.RefObject<HTMLDivElement>;
    
    public constructor(props: InlineHTMLProps) {
        super(props);
        this.state = {};

        this.ref = React.createRef<HTMLDivElement>();
    }

    public render(): JSX.Element {
        return (
            <div ref={ this.ref } ></div>
        );
    }

    public componentDidMount(): void {
        if (!this.ref.current) {
            console.error("InlineHTML element did not mount successfully.")
            return;
        }

        this.ref.current.innerHTML = this.props.html;
    }

};
