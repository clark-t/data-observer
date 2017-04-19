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

export function parsePath(dataPath) {
    let paths = dataPath.split('.');

    return function (obj) {
        let result = obj;

        for (let i = 0, max = paths.length; i < max; i++) {
            result = result[paths[i]];
        }

        return result;
    };
}

export function noop() {}

export function common(arr1, arr2) {
    return arr2.filter(item2 => arr1.indexOf(item2) > -1);
}

export function def(obj, key, {getter = noop, setter = noop}) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: getter,
        set: setter
    });
}
