/**
 * @file depend.js
 * @author clarkt (clarktanglei@163.com)
 */

import {HashSet} from './util';

export class Depend {
    constructor(dr) {
        this.dr = dr;
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
            this.dr._changeMap[subs[i]] = true;
        }

        for (let i = 0; i < max; i++) {
            this.dr[subs[i]];
        }
    }
}

Depend.TARGET = null;
const TARGET_STACK = [];

export function pushTarget(t) {
    if (Depend.TARGET != null) {
        TARGET_STACK.push(Depend.TARGET);
    }

    Depend.TARGET = t;
}

export function popTarget() {
    Depend.TARGET = TARGET_STACK.length ? TARGET_STACK.pop() : null;
}

