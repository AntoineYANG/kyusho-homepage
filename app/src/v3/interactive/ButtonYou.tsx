/*
 * @Author: Kanata You 
 * @Date: 2021-01-03 17:35:14 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-03 19:15:50
 */

import React, { useRef, useLayoutEffect } from "react";
import { TextV3 } from "../TypesV3";
import { TextNodeV3 } from "../cards/Card";


export interface ButtonYouProps {
    children: TextV3;
    onClick: () => void;
    style?: React.CSSProperties;
    type?: "normal" | "danger";
    handle?: {
        ref?: HTMLDivElement | null;
        trigger?: () => void;
    };
};

export const ButtonYou: React.FC<ButtonYouProps> = props => {
    const ref = useRef() as React.RefObject<HTMLDivElement>;

    useLayoutEffect(() => {
        if (props.handle) {
            props.handle.trigger = () => {
                ref.current?.click();
            };
            props.handle.ref = ref.current;
        }
    }, [props, ref]);
    
    return (
        <div className={ "LinkButton" + (props.type === "danger" ? " danger" : "") }
        ref={ ref }
        style={{ ...props.style }} onClick={ props.onClick } >
            <TextNodeV3>{ props.children }</TextNodeV3>
        </div>
    );
};
