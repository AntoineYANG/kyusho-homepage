/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-06 21:58:07 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-06 22:04:36
 */

export const isFullScreen = (): boolean => {
    return (
        document.fullscreenElement && true
    ) || (
        document.body.scrollHeight === window.screen.height
        && document.body.scrollWidth === window.screen.width
    );
};
