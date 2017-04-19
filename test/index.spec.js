/**
 * @file 测试文件
 * @author clarkt (clarktanglei@163.com)
 */

var DataReact = require('../dist/data-react');
var expect = require('chai').expect;

describe('test', function () {
    it('should be equal', function () {
        var dr = new DataReact({
            data: function () {
                return {
                    a: '',
                    b: ''
                };
            },
            computed: {
                c: function () {
                    return this.a + '*' + this.b;
                }
            },
            watch: {
                c: function (val) {
                    expect(val).to.be.equal('a');
                }
            }
        });

        dr.a = 'a';
    });
});
