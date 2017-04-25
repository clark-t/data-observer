/**
 * @file data-react main resource
 * @author clarkt (clarktanglei@163.com)
 */

import {Depend} from './depend';
import {def, instance} from './util';

export default class DataObserver {
    constructor({data, computed, watch = {}} = {}) {
        data && initData(this, data, watch);
        computed && initComputed(this, computed, watch);
        this._inited = true;
    }
}

function initData(ctx, data, watch) {
    data = data.call(ctx);
    let keys = Object.keys(data);

    for (let i = 0, max = keys.length; i < max; i++) {
        let key = keys[i];
        defineData(ctx, key, data[key], watch, key);
    }
}

function defineData(ctx, key, val, watch, watchKey) {
    const dep = new Depend(ctx);
    ctx.__dep__ = dep;

    let cb = watch[watchKey];

    def(ctx, key, {
        getter() {
            dep.add();
            return val;
        },
        setter(newVal) {
            let oldVal = val;

            if (newVal === oldVal) {
                return;
            }

            val = newVal;

            defineChild(key, val, watch, watchKey);

            dep.notify();
            cb && cb(val, oldVal);
        }
    });

    defineChild(key, val, watch, watchKey);
}

function defineChild(key, obj, watch, watchKey) {
    let inst = instance(obj);

    if (inst === 'Object') {
        let childKeys = Object.keys(obj);

        for (let i = 0, max = childKeys.length; i < max; i++) {
            let childKey = childKeys[i];
            let childWatchKey = watchKey + '.' + childKey;
            defineData(obj, childKey, obj[childKey], watch, childWatchKey);
        }
    }
    else if (inst === 'Array') {
        for (let i = 0, max = childKeys.length; i < max; i++) {
            let childKey = childKeys[i];
            let childWatchKey = watchKey + '.' + childKey;
            defineData(obj, childKey, obj[childKey], watch, childWatchKey);
        }
    }
}

function initComputed(ctx, computed, watch) {
    ctx._changeMap = {};

    let keys = Object.keys(computed);
    let max = keys.length;

    for (let i = 0; i < max; i++) {
        let key = keys[i];
        defineComputed(ctx, key, computed[key], watch[key]);
        ctx._changeMap[key] = true;
    }

    for (let i = 0; i < max; i++) {
        ctx[keys[i]];
    }
}

function defineComputed(ctx, key, getter, cb) {
    let val;
    const dep = new Depend(ctx);

    def(ctx, key, {
        getter() {
            dep.add();

            if (ctx._changeMap[key]) {
                ctx._changeMap[key] = false;

                let oldVal = val;

                Depend.pushTarget(key);
                val = getter.call(ctx);
                Depend.popTarget();

                if (val === oldVal) {
                    return;
                }

                if (ctx._inited) {
                    dep.notify();
                    cb && cb(val, oldVal);
                }
            }

            return val;
        }
    });
}
