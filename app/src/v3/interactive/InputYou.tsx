/*
 * @Author: Kanata You 
 * @Date: 2021-01-03 17:27:40 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-03 17:38:57
 */

import React from "react";


export interface InputYouProps {
    style?: React.CSSProperties;
};

export const InputYou: React.FC<InputYouProps> = props => {
    return (
        <input spellCheck="false"
        style={{
            outline: "none",
            background: "rgba(127,127,127,0.2)",
            border: "none",
            padding: "0.1em 0.3em",
            fontFamily: "ubuntu, 'Yu Mincho', 游明朝, source-code-pro, Menlo, Monaco, "
                + "Consolas, 'Courier New', monospace",
            ...props.style
        }} />
    );
};
