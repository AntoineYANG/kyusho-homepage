/*
 * @Author: Kanata You 
 * @Date: 2020-12-05 19:52:14 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-06 00:38:45
 */

export type VersionID = 2 | 3;

export interface PageConfigReduxState {
    version: VersionID;
};

export type PageConfigActionType = (
    "SWITCH_VERSION"
);

export type PageConfigReduxAction<AT extends PageConfigActionType = PageConfigActionType> = {
    type: AT;
    index: number;
} & (
    AT extends "SWITCH_VERSION" ? {
        index: 100;
        version: VersionID;
    } : {}
);

const initData: PageConfigReduxState = {
    version: window.location.href.includes("v2") ? 2 : 3
};

const jumpToVersion = (versionID: VersionID) => {
    let a: HTMLAnchorElement | null = null;
    switch (versionID) {
        case 2:
            a = document.createElement("a");
            a.href = "/v2";
            break;
        case 3:
            a = document.createElement("a");
            a.href = "/";
            break;
    }
    if (a) {
        a.click();
    }
};

export const PageConfigRedux = (state: PageConfigReduxState = initData, action: PageConfigReduxAction) => {
    switch (action.type) {
        case "SWITCH_VERSION":
            if (action.version !== state.version) {
                jumpToVersion(action.version);
                return Object.assign({}, state, { version: action.version });
            }
            return state;
        default:
            return state;
    }
};
    
export const PageConfig = {

    mapStateToProps: (state: { PageConfigRedux: PageConfigReduxState; }) => {
        return Object.assign({}, {
            version: state.PageConfigRedux.version
        });
    },

    mapDispatchToProps: (dispatch: (action: PageConfigReduxAction) => any) => {
        return {
            setVersion: (versionId: VersionID) => {
                return dispatch({
                    type: "SWITCH_VERSION",
                    index: 100,
                    version: versionId
                });
            }
        };
    }
    
};
