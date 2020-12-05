/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-01 03:44:39 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-01 03:53:52
 */

import $ from "jquery";
import { debounced } from "./decorator";


export const toast: () => void | null = debounced((text: string) => {
    const t = document.createElement("div");
    t.style.wordBreak = "break-all";
    t.style.display = "inline-block";
    t.style.position = "absolute";
    t.style.top = "18vh";
    t.style.left = "32vw";
    t.style.width = "36vw";
    t.style.textAlign = "center";
    t.style.backgroundColor = "rgb(22,22,22)";
    t.style.color = "rgb(244,255,226)";
    t.style.padding = "3vh 3vw";
    t.style.opacity = "0.8";
    t.innerText = text;
    document.body.appendChild(t);
    
    $(t).animate({
        top: "14vh"
    }, 800);

    setTimeout(() => {
        $(t).fadeOut(600);
    }, 800);
});
