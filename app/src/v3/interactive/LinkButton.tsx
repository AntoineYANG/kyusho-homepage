/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 16:48:21 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-06 17:41:04
 */

import React from "react";
import { TextV3 } from "../TypesV3";
import { TextNodeV3 } from "../cards/Card";
import { Link } from "react-router-dom";


export interface LinkButtonProps {
    children: TextV3;
    to: string;
    style?: React.CSSProperties;
};

export const LinkButton: React.FC<LinkButtonProps> = props => (
    <Link to={ props.to }>
        <div className="LinkButton" style={{ ...props.style }} >
            <TextNodeV3>{ props.children }</TextNodeV3>
        </div>
    </Link>
);
