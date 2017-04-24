/**
 * @file array.js
 * @author clarkt (clarktanglei@163.com)
 */
import {def} from './util';

const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
    const original = arrayProto[method];

    def(arrayMethods, method, function () {
        let args = [];
        for (let i = 0, len = arguments.length; i < len; i++) {
            args[i] = arguments[i];
        }

        let result = original.apply(this, args);
        let inserted;

        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
            default:
                break;
        }

        if (inserted) {
            let ob = this.__ob__;
            ob.observeArray(inserted);
            ob.dep.notify();
        }

        return result;
    });
});
