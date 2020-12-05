/*
 * @Author: Kanata You 
 * @Date: 2020-12-02 19:45:08 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-02 19:45:38
 */

export const Genshin = {
    getByIndex: (day: 0 | 1 | 2 | 3 | 4 | 5 | 6): [string, string] => {
        switch (day) {
            case 0:
                return [Genshin.Wind, Genshin.WindDark];
            case 1:
                return [Genshin.Fire, Genshin.FireDark];
            case 2:
                return [Genshin.Lightning, Genshin.LightningDark];
            case 3:
                return [Genshin.Ice, Genshin.IceDark];
            case 4:
                return [Genshin.Stone, Genshin.StoneDark];
            case 5:
                return [Genshin.Water, Genshin.WaterDark];
            case 6:
                return [Genshin.Grass, Genshin.GrassDark];
        }
    },
    Wind: "rgb(165,243,203)",
    WindDark: "rgb(86,173,126)",
    Fire: "rgb(254,167,111)",
    FireDark: "rgb(229,111,36)",
    Lightning: "rgb(222,186,255)",
    LightningDark: "rgb(166,113,216)",
    Ice: "rgb(185,231,228)",
    IceDark: "rgb(137,185,177)",
    Stone: "rgb(239,208,94)",
    StoneDark: "rgb(193,140,47)",
    Water: "rgb(9,225,252)",
    WaterDark: "rgb(39,137,197)",
    Grass: "rgb(174,231,41)",
    GrassDark: "rgb(121,179,14)"
};
