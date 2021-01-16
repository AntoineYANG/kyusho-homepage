/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 16:57:58 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 20:20:51
 */

import React from "react";
import { createStyle, useStyleWrapper } from "reacss";


const ButtonGroupStyle = createStyle({
    "div": {
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-around",
        flexWrap:       "wrap"
    }
})

export const ButtonGroup: React.FC<{ style?: React.CSSProperties; }> = props => {
    const StyleWrapper = useStyleWrapper(ButtonGroupStyle);
    
    return (
        <StyleWrapper>
            <div style={{ ...props.style }} >
                { props.children }
            </div>
        </StyleWrapper>
    );
};
