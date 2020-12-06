/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 15:14:33 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-06 16:29:41
 */

// V3 版本里用到的类型声明

export type Lang = "CH" | "JP" | "EN";

export class TextV3 {
    public readonly CH: string;
    public readonly JP: string;
    public readonly EN: string;
    public constructor(CH: string, JP?: string, EN?: string) {
        this.CH = CH;
        this.JP = JP ?? EN ?? CH;
        this.EN = EN ?? CH;
    }
};
