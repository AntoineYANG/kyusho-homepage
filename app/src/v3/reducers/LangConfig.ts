/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 15:41:45 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-06 16:24:11
 */

import { Lang } from "../TypesV3";


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

const initData: LangReduxState = {
    lang: navigator.language.startsWith("zh") ? "CH"
        : navigator.language.startsWith("ja") ? "JP" : "EN"
};


export const LangRedux = <AT extends LangActionType>(state: LangReduxState = initData, action: LangReduxAction<AT>) => {
    switch (action.type) {
        case "CHANGE_LANG":
            const clAction = action as LangReduxAction<"CHANGE_LANG">;
            if (clAction.lang !== state.lang) {
                return Object.assign({}, state, { version: clAction.lang });
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
