/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-29 00:17:10 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-08 00:30:15
 */

import { Theme } from "./typedict";
import { Yuki } from "../themes/Yuki";

export interface SharedItem {
    theme: Theme;
    cursorState: "normal" | "pointer" | "origin";
    animationFPS: number;
    realFPS: number;
    autoFPS: boolean;
    particalEffects: 0 | 1 | 2 | 3;
    particalOpacity: number;
};

export let Shared: SharedItem = {
    theme: Yuki,
    cursorState: "normal",
    animationFPS: 60,
    realFPS: 60,
    autoFPS: true,
    particalEffects: 2,
    particalOpacity: 0.8
};
