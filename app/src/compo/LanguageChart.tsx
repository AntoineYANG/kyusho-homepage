/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-05 19:56:44 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-05 20:41:10
 */

import React from "react";
import { LanguageInfo } from "../methods/typedict";
import { Shared } from "../methods/globals";


export interface LanguageChartProps {
    data: Array<LanguageInfo>;
};

/**
 * 函数式组件: 绘制语言使用统计图.
 *
 * @param {LanguageChartProps} props
 * @returns {JSX.Element}
 */
export const LanguageChart = (props: LanguageChartProps): JSX.Element => {
    let offset: number = 0;
    const b: number = 99 + props.data.length;

    const proj: Array<{
        x: number;
        w: number;
        label: string;
        value: number;
    }> = props.data.map(d => {
        offset += d.rate * b + 1;
        return {
            x: offset - d.rate * b - 1,
            w: d.rate * b,
            label: d.name,
            value: d.rate
        };
    });

    return (
        <>
            <svg key="1" style={{
                display: "block",
                width: "96%",
                height: "6px",
                margin: "4px 2% 2px",
                borderRadius: "3px"
            }} >
            {
                proj.map((d, i) => {
                    return (
                        <rect key={ i }
                        x={ `${ d.x }%` } y="0"
                        width={ `${ d.w }%` } height="6px"
                        style={{
                            fill: Shared.theme.colortab[(
                                i % 3 === 0 ? "frontground"
                                    : i % 3 === 1 ? "frontground2"
                                        : "frontground3"
                            )]
                        }} />
                    );
                })
            }
            </svg>
            <div key="2" style={{
                display: "block",
                fontSize: "10px",
                width: "96%",
                height: "12px",
                margin: "2px 2% 4px",
                overflow: "hidden",
                textAlign: "left"
            }} >
            {
                proj.map((d, i) => {
                    return d.w >= 8 ? (
                        <label key={ i }
                        style={{
                            cursor: "none",
                            color: Shared.theme.colortab[(
                                i % 3 === 0 ? "frontground"
                                    : i % 3 === 1 ? "frontground2"
                                        : "frontground3"
                            )],
                            textOverflow: "ellipsis",
                            position: "relative",
                            top: 0,
                            left: `${ i * 3 }%`,
                            width: `${ d.w - 2 }%`,
                            overflow: "hidden",
                            display: "inline-block"
                        }} >
                            { d.label }
                        </label>
                    ) : null;
                })
            }
            </div>
        </>
    );
};
