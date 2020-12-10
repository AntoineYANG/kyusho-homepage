/*
 * @Author: Kanata You 
 * @Date: 2020-12-10 17:27:12 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-10 19:58:42
 */

import React, { useRef, useEffect } from "react";
import { TextV3 } from "../TypesV3";
import { HTMLNodeV3 } from "../cards/Card";


export interface TextEnteringProps {
    children: TextV3;
    x: number | string;
    direction: "left" | "right";
    style?: React.CSSProperties;
    delay: number;
    duration: number;
};

export const TextEntering: React.FC<TextEnteringProps> = props => {
    const ref = useRef<HTMLLabelElement>() as React.RefObject<HTMLLabelElement>;

    useEffect(() => {
        const label = ref.current!;
        if (props.direction === "left") {
            label.style.transform = `translateX(-2em)`;
            label.style.opacity = "0";
            for (let t: number = 0; t < props.duration; t += 30) {
                setTimeout(() => {
                    if (label) {
                        label.style.transform = `translateX(-${ (1 - t / props.duration) * 2 }em)`;
                        label.style.opacity = `${ t / props.duration }`;
                    }
                }, props.delay + t);
            }
        } else {
            label.style.transform = `translateX(2em)`;
            label.style.opacity = "0";
            for (let t: number = 0; t < props.duration; t += 30) {
                setTimeout(() => {
                    if (label) {
                        label.style.transform = `translateX(${ (1 - t / props.duration) * 2 }em)`;
                        label.style.opacity = `${ t / props.duration }`;
                    }
                }, props.delay + t);
            }
        }
        setTimeout(() => {
            if (label) {
                label.style.transform = "";
                label.style.opacity = "";
            }
        }, props.delay + props.duration);
    });

    return (
        <label ref={ ref } style={{
            display: "inline-block",
            marginLeft: props.x,
            ...props.style
        }} >
            <HTMLNodeV3>
                { props.children }
            </HTMLNodeV3>
        </label>
    );
};
