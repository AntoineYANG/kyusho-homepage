/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-29 21:41:10 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-09 20:05:06
 */

import React from "react";
import { PageBody } from "../methods/typedict";
import { Shared } from "../methods/globals";
import { SettingValueBar, SettingRadio } from "../compo/SettingItem";
import { HomeButton } from "../compo/HomeButton";
import { Navigator } from "../compo/Navigator";


/**
 * 这个页面级组件渲染对应地址 /settings .
 * 
 * @export
 * @class Settings
 * @extends {PageBody<{}>}
 */
export class Settings extends PageBody<{}> {

    protected fpsSetter: React.RefObject<SettingValueBar>;
    protected fpsRadio: React.RefObject<SettingRadio>;
    protected fpsUpdater: NodeJS.Timeout;

    public constructor(props: {}) {
        super(props);
        this.state = {};

        this.fpsSetter = React.createRef<SettingValueBar>();
        this.fpsRadio = React.createRef<SettingRadio>();
        this.fpsUpdater = Shared.autoFPS ? setInterval(() => {
            this.fpsSetter.current?.setState({
                value: Shared.animationFPS
            });
        }, 400) : setTimeout(() => {}, 0);
    }
    
    public render(): JSX.Element {
        return (
            <>
                <Navigator>
                    <HomeButton active={ true } />
                </Navigator>
                <h1 style={{
                    color: Shared.theme.colortab.color,
                    margin: "calc(10px + 8vh) 0 calc(10px + 2vh)",
                    padding: "1vh 5vw"
                }} >
                    Settings
                </h1>
                <div style={{
                    color: Shared.theme.colortab.color,
                    width: "86vw",
                    margin: "calc(10px + 4vh) 0 calc(10px + 2vh)",
                    padding: "1vh 5vw",
                    display: "block"
                }} >
                    <SettingValueBar ref={ this.fpsSetter } name="Animation FPS"
                    min={ 10 } max={ 120 } default={ Shared.animationFPS }
                    formatter={
                        (val: number) => val
                    }
                    setter={
                        (val: number) => Math.floor(val / 5) * 5
                    }
                    previewChanging={
                        (val: number) => {
                            clearInterval(this.fpsUpdater);
                            this.fpsUpdater = setTimeout(() => {}, 0);
                            if (Shared.autoFPS) {
                                Shared.autoFPS = false;
                                this.fpsRadio.current?.setState({
                                    value: false
                                });
                            }
                            Shared.animationFPS = val;
                        }
                    }
                    valueChanged={
                        (val: number) => {
                            Shared.animationFPS = val;
                        }
                    } />
                    <SettingRadio ref={ this.fpsRadio } name="Auto FPS"
                    default={ Shared.autoFPS }
                    formatter={
                        (val: boolean) => val ? "on" : "off"
                    }
                    valueChanged={
                        (val: boolean) => {
                            Shared.autoFPS = val;

                            clearInterval(this.fpsUpdater);

                            this.fpsUpdater = Shared.autoFPS ? setInterval(() => {
                                this.fpsSetter.current?.setState({
                                    value: Shared.animationFPS
                                });
                            }, 400) : setTimeout(() => {}, 0);
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
                        (val: number) => val.toFixed(2)
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
            </>
        );
    }

    public componentDidMount(): void {
        Shared.cursorState = "normal";
    }

    public componentWillUnmount(): void {
        clearInterval(this.fpsUpdater);
    }

};
