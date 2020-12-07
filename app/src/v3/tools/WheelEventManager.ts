/*
 * @Author: Kanata You 
 * @Date: 2020-12-07 11:49:18 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-07 12:11:05
 */

/** 最小的 delta 阈值 */
const WHEEL_DELTA_THREAD = 10;

let WheelEventInfo = {
    deltaY: 0
};

/**
 * 登录一个事件，用以判断之后输入的 wheel 事件是否与此 wheel 事件连续.
 *
 * @exports
 * @param {WheelEvent} ev
 * @returns {void}
 */
export const SubscribeWheelEvent = (ev: WheelEvent): void => {
    if (Math.abs(ev.deltaY) > WHEEL_DELTA_THREAD) {
        WheelEventInfo.deltaY = ev.deltaY;
    }
};

/**
 * 卸载登录的 wheel 事件.
 *
 * @exports
 * @returns {void}
 */
export const UnsubscribeWheelEvent = (): void => {
    WheelEventInfo.deltaY = 0;
};

/**
 * 判断一个输入的 wheel 事件是否与上一个 wheel 事件连续.
 * 
 * 部分浏览器（如 Chrome）为获得平滑过渡的滚动效果，
 * 会由一次 wheel 交互产生若干连续的 wheel 事件.
 * 
 * 此方法采用对比方向和 deltaY 的形式决定新输入的事件是否连续于上一次输入.
 *
 * @exports
 * @param {WheelEvent} ev
 * @returns {boolean}
 */
export const IsWheelEventValid = (ev: WheelEvent): boolean => {
    let flag: boolean = false;

    if (Math.abs(ev.deltaY) < WHEEL_DELTA_THREAD) {
        return false;
    }

    if (ev.deltaY * WheelEventInfo.deltaY < 0) {
        // 方向相反
        flag = true;
    } else if (Math.abs(ev.deltaY) > Math.abs(WheelEventInfo.deltaY) + 2) {
        // 连续触发的 wheel 事件，delta 值会持续衰减.
        // 此处与触发阶段结尾的 delta 值比较.
        // 其中可能会产生连续的两个 delta 值相同的事件，
        // 甚至比反增 1.25，所以比较时加上 2.
        flag = true;
    }

    return flag;
};
