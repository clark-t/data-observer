/**
 * @file array.js
 * @author clarkt (clarktanglei@163.com)
 */
import {def} from './util';

const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
    const original = arrayProto[method];

    def(arrayMethods, method, {
        value: function () {
            let result = original.apply(this, Array.from(arguments));
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

            if (inserted && this.__dep__) {
                dep.notify();
            }

            return result;
        }
    });
});
