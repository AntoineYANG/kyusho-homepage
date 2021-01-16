/*
 * @Author: Kanata You 
 * @Date: 2021-01-16 16:29:51 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 18:08:31
 */

export type ColorScheme = "light" | "dark";

const modeD: MediaQueryList = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
const modeL: MediaQueryList = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');

export interface SchemeReduxState {
    value:  ColorScheme;
};

export type SchemeActionType = (
    "CHANGE_SCHEME"
);

export type SchemeReduxAction<AT extends SchemeActionType> = {
    type: AT;
    index: number;
} & (
    AT extends "CHANGE_SCHEME" ? {
        index: 101;
        scheme: ColorScheme;
    } : {}
);

const initScheme: ColorScheme = window.matchMedia ? (
    modeD.matches ? "dark" : modeL.matches ? "light" : "light"
) : "light";

const initData: SchemeReduxState = {
    value: initScheme
};


export const SchemeRedux = <AT extends SchemeActionType>(state: SchemeReduxState = initData, action: SchemeReduxAction<AT>) => {
    switch (action.type) {
        case "CHANGE_SCHEME":
            const clAction = action as SchemeReduxAction<"CHANGE_SCHEME">;
            if (clAction.scheme !== state.value) {
                return Object.assign({}, state, { value: clAction.scheme });
            }
            return state;
        default:
            return state;
    }
};
    
export const SchemeConfig = {

    mapStateToProps: (state: { SchemeRedux: SchemeReduxState; }) => {
        return Object.assign({}, {
            scheme: state.SchemeRedux.value
        });
    },

    mapDispatchToProps: (dispatch: (action: SchemeReduxAction<"CHANGE_SCHEME">) => any) => {
        return {
            setScheme: (scheme: ColorScheme) => {
                return dispatch({
                    type: "CHANGE_SCHEME",
                    index: 101,
                    scheme: scheme
                });
            }
        };
    }
    
};
