/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-29 21:41:10 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-30 22:43:34
 */

import React from "react";
import { PageBody } from "../methods/typedict";
import { Shared } from "../methods/globals";
import { SettingValueBar } from "../compo/SettingItem";
import { HomeButton } from "../compo/HomeButton";


/**
 * 这个页面级组件渲染对应地址 /settings .
 * 
 * @export
 * @class Settings
 * @extends {PageBody<{}>}
 */
export class Settings extends PageBody<{}> {

    public constructor(props: {}) {
        super(props);
        this.state = {};
    }
    
    public render(): JSX.Element {
        return (
            <>
                <h1 style={{
                    color: Shared.theme.colortab.color,
                    margin: "calc(20px + 3vh)"
                }} >
                    Settings
                </h1>
                <div style={{
                    color: Shared.theme.colortab.color,
                    width: "86vw",
                    margin: "calc(10px + 6vh) 4vw calc(10px + 3vh)",
                    padding: "calc(12px + 5vh) 3vw",
                    display: "block"
                }} >
                    <SettingValueBar name="Animation FPS"
                    min={ 10 } max={ 120 } default={ Shared.animationFPS }
                    formatter={
                        (val: number) => val
                    }
                    setter={
                        (val: number) => Math.floor(val / 5) * 5
                    }
                    previewChanging={
                        (val: number) => {
                            Shared.animationFPS = val;
                        }
                    }
                    valueChanged={
                        (val: number) => {
                            Shared.animationFPS = val;
                        }
                    } />
                    <SettingValueBar name="Partical Effects"
                    formatter={
                        (val: number) => (
                            val === 3 ? "high"
                                : val === 2 ? "normal"
                                    : val === 1 ? "low"
                                        : "off"
                        )
                    }
                    min={ 0 } max={ 3 } default={ Shared.particalEffects }
                    setter={
                        (val: number) => Math.round(val)
                    }
                    previewChanging={
                        (val: number) => {
                            Shared.particalEffects = val as 0 | 1 | 2 | 3;
                        }
                    }
                    valueChanged={
                        (val: number) => {
                            Shared.particalEffects = val as 0 | 1 | 2 | 3;
                        }
                    } />
                    <SettingValueBar name="Partical Opacity"
                    formatter={
                        (val: number) => val.toPrecision(2)
                    }
                    min={ 0.1 } max={ 1 } default={ Shared.particalOpacity }
                    setter={
                        (val: number) => val
                    }
                    previewChanging={
                        (val: number) => {
                            Shared.particalOpacity = val;
                        }
                    }
                    valueChanged={
                        (val: number) => {
                            Shared.particalOpacity = val;
                        }
                    } />
                </div>
                <HomeButton />
            </>
        );
    }

    public componentDidMount(): void {
        Shared.cursorState = "normal";
    }

};
