/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 21:07:40 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-29 18:34:52
 */

import React from "react";
import { PageBody } from "../methods/typedict";
import { Shared } from "../methods/globals";


/**
 * 这个页面级组件渲染对应地址 / .
 * 
 * @export
 * @class Home
 * @extends {PageBody<{}>}
 */
export class Home extends PageBody<{}> {
    
    public render(): JSX.Element {
        return (
            <>
                <h1 style={{
                    color: Shared.theme.colortab.color,
                    margin: "calc(20px + 3vh)"
                }} >
                    AntoineYANG
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
                    网站升级中...
                    <br />
                    <br />
                    <span style={{ color: "rgb(255,151,211)" }} >Sorry,&nbsp;</span>
                    <span style={{ color: "rgb(219,215,0)" }} >this website&nbsp;</span>
                    <span style={{ color: "rgb(133,232,62)" }} >is under&nbsp;</span>
                    <span style={{ color: "rgb(63,119,134)" }} >rebuiding...</span>
                </div>
            </>
        );
    }

};
