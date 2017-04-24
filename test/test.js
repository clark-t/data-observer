/**
 * @file 测试文件
 * @author clarkt (clarktanglei@163.com)
 */

/* eslint-disable no-console */
/* global DataReact */

var dr = new DataObserver({
    data: function () {
        return {
            a: 'a',
            b: 'b',
            c: 'c',
            d: true
        };
    },
    computed: {
        e: function () {
            return this.a + '-' + this.b;
        },
        f: function (val) {
            return '~' + this.e;
        },
        g: function (val) {
            return this.d ? ('*' + this.c) : ('**' + this.e);
        }
    },
    watch: {
        e: function (val) {
            console.log('e:' + val);
        },
        f: function (val) {
            console.log('f:' + val);
        },
        g: function (val) {
            console.log('g:' + val);
        }
    }
});

dr.c = 'cc';
console.log('---');
dr.d = false;
console.log('---');
dr.c = 'ccc';
console.log('---');
dr.d = true;
