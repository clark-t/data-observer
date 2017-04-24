/**
 * @file 测试文件
 * @author clarkt (clarktanglei@163.com)
 */

var DataObserver = require('../dist/data-observer');
var expect = require('chai').expect;

describe('test', function () {
    it('should be equal', function () {
        var arr = [
            {
                key: 'a',
                val: 'aa',
                expect: {
                    d: '[d]aab',
                    e: '[e][d]aab',
                    f: '[f][d]aab'
                },
                weight: {
                    expect: 7,
                    val: 0
                }
            },
            {
                key: 'c',
                val: 'cc',
                expect: {
                    d: '[d]aab',
                    e: '[e][d]aab',
                    f: '[f][d]aab'
                },
                weight: {
                    expect: 0,
                    val: 0
                }
            },
            {
                key: 'flag',
                val: false,
                expect: {
                    d: '[d]aab',
                    e: '[e][d]aab',
                    f: '[f]cc'
                },
                weight: {
                    expect: 4,
                    val: 0
                }
            },
            {
                key: 'c',
                val: 'ccc',
                expect: {
                    d: '[d]aab',
                    e: '[e][d]aab',
                    f: '[f]ccc'
                },
                weight: {
                    expect: 4,
                    val: 0
                }
            }
        ];

        var index = 0;

        var dr = new DataObserver({
            data: function () {
                return {
                    a: 'a',
                    b: 'b',
                    c: 'c',
                    flag: true
                };
            },
            computed: {
                d: function () {
                    return '[d]' + this.a + '' + this.b;
                },
                e: function () {
                    return '[e]' + this.d;
                },
                f: function () {
                    return '[f]' + (this.flag ? this.d : this.c);
                }
            },
            watch: {
                d: function (val) {
                    expect(val).to.be.equal(arr[index].expect.d);
                    arr[index].weight.val += 1;
                },
                e: function (val) {
                    expect(val).to.be.equal(arr[index].expect.e);
                    arr[index].weight.val += 2;
                },
                f: function (val) {
                    expect(val).to.be.equal(arr[index].expect.f);
                    arr[index].weight.val += 4;
                }
            }
        });

        for (var max = arr.length; index < max; index++) {
            dr[arr[index].key] = arr[index].val;
            expect(arr[index].weight.val).to.be.equal(arr[index].weight.expect);
        }
    });

    it('should be equal', function () {
        var arr = [
            {
                key: 'a.a1.a11',
                val: 'aa11',
                expect: {
                    'a.a1.a11': {
                        newVal: 'aa11',
                        oldVal: 'a11'
                    }
                }
            },
            {
                key: 'a.a1',
                val: {
                    a11: 'cc'
                }
            },
            {
                key: 'a.a1.a11',
                val: 'aaa11',
                expect: {
                    'a.a1.a11': {
                        newVal: 'aaa11',
                        oldVal: 'cc'
                    }
                }
            },
            {
                key: 'a',
                val: {
                    a1: {
                        a11: 'ccc'
                    }
                }
            },
            {
                key: 'a.a1.a11',
                val: 'aaaa11',
                expect: {
                    'a.a1.a11': {
                        newVal: 'aaaa11',
                        oldVal: 'ccc'
                    }
                }
            }
        ];
        var index = 0;

        var dr = new DataObserver({
            data: function () {
                return {
                    a: {
                        a1: {
                            a11: 'a11'
                        },
                        a2: 'a2'
                    },
                    b: 'b'
                };
            },
            watch: {
                'a.a1.a11': function (val, oldVal) {
                    expect(val).to.be.equal(arr[index]['a.a1.a11'].newVal);
                    expect(oldVal).to.be.equal(arr[index]['a.a1.a11'].oldVal);
                }
            }
        });

        for (var max = arr.length; index < max; index++) {
            /* eslint-disable */
            var obj = getter(dr, arr[index].key);
            obj = arr[index].val;
            /* eslint-enable */
        }
    });
});

function getter(obj, keyStr) {
    var arr = keyStr.split('.');
    var result = obj;
    for (var i = 0, max = arr.length; i < max; i++) {
        result = result[arr[i]];
    }

    return result;
}
