/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 20:50:07 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-09 22:34:34
 */

import React from "react";
import { PageBody } from "../methods/typedict";
import { Shared } from "../methods/globals";
import { HomeButton } from "../compo/HomeButton";
import { Navigator } from "../compo/Navigator";
import { SettingsButton } from "../compo/SettingsButton";
import { ContactMe } from "../compo/ContactMe";


/**
 * 这个页面级组件在无法访问对应网址时渲染.
 * 
 * @export
 * @class BadUrl
 * @extends {PageBody<{}>}
 */
export class BadUrl extends PageBody<{}> {

    public constructor(props: {}) {
        super(props);
        this.state = {};
    }
    
    public render(): JSX.Element {
        return (
            <>
                <Navigator>
                    <HomeButton active={ true } />
                    <SettingsButton />
                    <ContactMe />
                </Navigator>
                <div style={{
                    color: Shared.theme.colortab.color,
                    margin: "calc(10px + 6vh) 0 calc(10px + 3vh)",
                    padding: "calc(12px + 5vh) calc(20px + 5vw)",
                    border: `1px solid ${ Shared.theme.colortab.border }`,
                    boxShadow: `6px 5px 0 1px ${
                        Shared.theme.colortab.border.replace(
                            "(", "a("
                        ).replace(
                            ")", ",0.1)"
                        )
                    }`
                }} >
                    <h1 style={{
                        color: Shared.theme.colortab.color,
                        margin: "calc(20px + 3vh)"
                    }} >
                        404 - Bad Gateway
                    </h1>
                    <br />
                    <span style={{ color: Shared.theme.colortab.frontground }} >
                        Sorry, the URL you required is not valid.
                    </span>
                </div>
            </>
        );
    }

    public componentDidMount(): void {
        Shared.cursorState = "normal";
    }

};
