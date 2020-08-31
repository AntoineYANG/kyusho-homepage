/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-01 03:44:26 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-01 03:51:31
 */

import { toast } from "./toast";


const clip = document.createElement("div");

window.onload = () => {
    clip.style.width = "0";
    clip.style.height = "0";
    clip.style.overflow = "hidden";
    clip.style.userSelect = "unset";
    document.body.appendChild(clip);
};

export const execCopy = (text: string) => {
    clip.innerText = text;

    const selection = window.getSelection()!;
    selection.removeAllRanges();

    const range = document.createRange();
    range.selectNodeContents(clip);

    selection.addRange(range);

    document.execCommand('copy');

    selection.removeAllRanges();

    (toast as any).call(
        {},
        `Copied successfully: \n\n"${ text }"`
    );
};

