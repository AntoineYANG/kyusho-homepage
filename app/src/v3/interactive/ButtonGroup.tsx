/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 16:57:58 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-06 17:00:50
 */

import React from "react";


export const ButtonGroup: React.FC<{ style?: React.CSSProperties; }> = props => (
    <div className="ButtonGroup" style={{ ...props.style }} >
        { props.children }
    </div>
);
