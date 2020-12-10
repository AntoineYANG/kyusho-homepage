/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 15:41:45 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-09 19:13:59
 */

import { Lang } from "../TypesV3";
import $ from "jquery";


export interface LangReduxState {
    lang: Lang;
};

export type LangActionType = (
    "CHANGE_LANG"
);

export type LangReduxAction<AT extends LangActionType> = {
    type: AT;
    index: number;
} & (
    AT extends "CHANGE_LANG" ? {
        index: 101;
        lang: Lang;
    } : {}
);

const pageLang = navigator.language.slice(0, 2);

const initLang: Lang = pageLang === "zh" ? "CH" : pageLang === "ja" ? "JP" : "EN";

$("html").attr("lang", pageLang);

const initData: LangReduxState = {
    lang: initLang
};


export const LangRedux = <AT extends LangActionType>(state: LangReduxState = initData, action: LangReduxAction<AT>) => {
    switch (action.type) {
        case "CHANGE_LANG":
            const clAction = action as LangReduxAction<"CHANGE_LANG">;
            if (clAction.lang !== state.lang) {
                $("html").attr("lang", clAction.lang.toLocaleLowerCase());
                return Object.assign({}, state, { lang: clAction.lang });
            }
            return state;
        default:
            return state;
    }
};
    
export const LangConfig = {

    mapStateToProps: (state: { LangRedux: LangReduxState; }) => {
        return Object.assign({}, {
            lang: state.LangRedux.lang
        });
    },

    mapDispatchToProps: (dispatch: (action: LangReduxAction<"CHANGE_LANG">) => any) => {
        return {
            setLang: (lang: Lang) => {
                return dispatch({
                    type: "CHANGE_LANG",
                    index: 101,
                    lang: lang
                });
            }
        };
    }
    
};
