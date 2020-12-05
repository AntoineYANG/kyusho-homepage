/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-05 16:46:27 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-05 16:51:13
 */

/**
 * 从数组中返回第一个匹配要求的元素, 
 * 若找不到则返回 null. 
 *
 * @template T 数组元素类型
 * @param {Array<T>} a 数组
 * @param {(item: T, index: number) => boolean} each 判断函数
 * @returns {(T | null)}
 */
export const find = <T>(a: Array<T>, each: (item: T, index: number) => boolean): T | null => {
    for (let i: number = 0; i < a.length; i++) {
        if (each(a[i], i)) {
            return a[i];
        }
    }

    return null;
};

/**
 * 从数组中返回所有匹配要求的元素.
 *
 * @template T 数组元素类型
 * @param {Array<T>} a 数组
 * @param {(item: T, index: number) => boolean} each 判断函数
 * @returns {Array<T>}
 */
export const findAll = <T>(a: Array<T>, each: (item: T, index: number) => boolean): Array<T> => {
    let box: Array<T> = [];

    a.forEach((e, i) => {
        if (each(e, i)) {
            box.push(e);
        }
    });

    return box;
};
