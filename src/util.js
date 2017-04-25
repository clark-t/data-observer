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

export function instance(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

export function isObject(obj) {
    return instance(obj) === 'Object';
}

export const isArray = Array.isArray;

export function noop() {}

export function common(arr1, arr2) {
    return arr2.filter(item2 => arr1.indexOf(item2) > -1);
}

export function def(obj, key, {getter = noop, setter = noop, value}) {
    let config = {
        enumerable: true,
        configurable: true
    };

    if (value !== undefined) {
        config.value = value;
    }
    else {
        config.get = getter;
        config.set = setter;
    }

    Object.defineProperty(obj, key, config);
}

