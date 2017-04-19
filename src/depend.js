/**
 * @file depend.js
 * @author clarkt (clarktanglei@163.com)
 */

import {HashSet} from './util';

export class Depend {
    constructor(ctx) {
        this.ctx = ctx;
        this.subs = new HashSet();
    }

    add() {
        if (Depend.TARGET) {
            this.subs.add(Depend.TARGET);
        }
    }

    notify() {
        let subs = this.subs.toArray();
        let max = subs.length;

        for (let i = 0; i < max; i++) {
            this.ctx._changeMap[subs[i]] = true;
        }

        for (let i = 0; i < max; i++) {
            this.ctx[subs[i]];
        }
    }
}

Depend.TARGET = null;
const TARGET_STACK = [];

Depend.pushTarget = function (t) {
    if (Depend.TARGET != null) {
        TARGET_STACK.push(Depend.TARGET);
    }

    Depend.TARGET = t;
};

Depend.popTarget = function () {
    Depend.TARGET = TARGET_STACK.length ? TARGET_STACK.pop() : null;
};

