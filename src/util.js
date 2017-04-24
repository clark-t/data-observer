/**
 * @file 工具文件
 * @author clarkt (clarktanglei@163.com)
 */

export class HashSet {
    constructor() {
        this.sets = [];
    }

    add(obj) {
        if (this.sets.indexOf(obj) < 0) {
            this.sets.push(obj);
        }
    }

    toArray() {
        return this.sets.slice(0);
    }
}

export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

export const isArray = Array.isArray;

export function noop() {}

export function common(arr1, arr2) {
    return arr2.filter(item2 => arr1.indexOf(item2) > -1);
}

export function proxy(obj, key, {getter = noop, setter = noop}) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: getter,
        set: setter
    });
}

export function def(obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        value: val
    });
}
