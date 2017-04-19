/**
 * @file data-react main resource
 * @author clarkt (clarktanglei@163.com)
 */

import {Depend, pushTarget, popTarget} from './depend';

export default class DataReact {
    constructor(opts = {}) {
        opts.data && initData(this, opts);
        opts.computed && initComputed(this, opts);
        this._inited = true;
    }
}

function initData(ctx, {data, watch = {}}) {
    data = data.call(ctx);
    let keys = Object.keys(data);

    for (let i = 0, max = keys.length; i < max; i++) {
        let key = keys[i];
        defineData(ctx, key, data[key], watch[key]);
    }
}

function defineData(ctx, key, val, cb) {
    const dep = new Depend(ctx);

    Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get() {
            dep.add();
            return val;
        },
        set(newVal) {
            let oldVal = val;

            if (newVal === oldVal) {
                return;
            }

            val = newVal;

            dep.notify();
            cb && cb(val, oldVal);
        }
    });
}

function initComputed(ctx, {computed, watch = {}}) {
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

    Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get() {
            dep.add();

            if (ctx._changeMap[key]) {
                ctx._changeMap[key] = false;

                pushTarget(key);

                let oldVal = val;
                val = getter.call(ctx);

                popTarget();

                if (val === oldVal) {
                    return;
                }

                if (ctx._inited) {
                    dep.notify();
                    cb && cb(val, oldVal);
                }
            }

            return val;
        },
        set() {}
    });
}
