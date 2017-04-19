/**
 * @file 测试文件
 * @author clarkt (clarktanglei@163.com)
 */

var DataReact = require('../dist/data-react');
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

        var dr = new DataReact({
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
});
