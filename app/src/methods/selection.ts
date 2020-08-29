/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-29 17:07:00 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-29 17:11:30
 */

export const getSelectedElement = () => {
    const selection: Selection | null = document.getSelection();
    if (selection?.toString().length) {
        return selection.focusNode?.parentElement || null;
    }

    return null;
};
