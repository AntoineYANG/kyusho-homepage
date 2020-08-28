/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 20:50:07 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-29 00:35:17
 */

import React from "react";
import { PageBody } from "../methods/typedict";
import { Shared } from "../methods/globals";


/**
 * 这个页面级组件在无法访问对应网址时渲染.
 * 
 * @export
 * @class BadUrl
 * @extends {PageBody<{}>}
 */
export class BadUrl extends PageBody<{}> {
    
    public render(): JSX.Element {
        return (
            <>
                <h1 style={{
                    color: Shared.theme.colortab.color,
                    margin: "calc(20px + 3vh)"
                }} >
                    404
                </h1>
                <div style={{
                    color: Shared.theme.colortab.color,
                    margin: "calc(10px + 6vh) calc(20px + 8vw) calc(10px + 3vh)",
                    padding: "calc(12px + 5vh)",
                    border: `1px solid ${ Shared.theme.colortab.border }`,
                    boxShadow: `6px 5px 0 1px ${
                        Shared.theme.colortab.border.replace(
                            "(", "a("
                        ).replace(
                            ")", ",0.1)"
                        )
                    }`
                }} >
                    很抱歉，您访问的页面不存在。
                </div>
            </>
        );
    }

};
