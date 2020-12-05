/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-29 17:07:00 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-29 17:11:30
 */


/**
 * 获取当前窗口被选中且获取聚焦的元素.
 *
 * @returns {HTMLElement | null}
 */
export const getSelectedElement = (): HTMLElement | null => {
    const selection: Selection | null = document.getSelection();
    if (selection?.toString().length) {
        return selection.focusNode?.parentElement || null;
    }

    return null;
};

/**
 * 获取指定元素的某个样式属性值，
 * 当该样式继承时，
 * 自动寻找父元素.
 *
 * @param {HTMLElement} e 目标元素
 * @param {keyof CSSStyleDeclaration} name 样式名
 * @returns {string}
 */
export const getStyle = (e: HTMLElement, name: keyof CSSStyleDeclaration): string => {
    const style: string = e.style[name];
    if (!style && e.parentElement) {
        return getStyle(e.parentElement, name);
    }
    return style;
};
