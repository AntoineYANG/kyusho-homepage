/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-29 00:17:10 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-05 20:53:32
 */

import { Theme } from "./typedict";
import { Yuki } from "../themes/Yuki";
import { Opening } from "../kanata/Opening";
// import { NormalV3 } from "../themes/NormalV3";


export type SupportedVersion = "2.x" | "3.x";

export interface SharedItem {
    version: SupportedVersion;
    theme: Theme;
    cursorState: "normal" | "pointer" | "origin";
    animationFPS: number;
    realFPS: number;
    autoFPS: boolean;
    particalEffects: 0 | 1 | 2 | 3;
    particalOpacity: number;
    opening?: Opening;
};

export let Shared: SharedItem = {
    version: "2.x",
    theme: Yuki,
    cursorState: "normal",
    animationFPS: 60,
    realFPS: 60,
    autoFPS: true,
    particalEffects: 2,
    particalOpacity: 0.8
};
