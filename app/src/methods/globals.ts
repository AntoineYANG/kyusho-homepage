/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-29 00:17:10 
 * @Last Modified by:   Antoine YANG 
 * @Last Modified time: 2020-08-29 00:17:10 
 */

import { Theme } from "./typedict";
import { Yuki } from "../themes/Yuki";

export interface Shared {
    theme: Theme;
};

export let Shared: Shared = {
    theme: Yuki
};
