var assert = require('assert');

// import {add} from "../add.js"
var add = require('../add.js').add;
var mul = require('../add.js').add;

describe("add function testing", function(){
    it('1 + 2 shoule be 3', function() {
        assert.equal(add(1,2), 3);
    }); 

    it('-1 + -6 shoule be -7', function() {
        assert.equal(add(-1,-6), -7);
    }); 

    it('-2 * -6 shoule be 12', function() {
        assert.equal(mul(-2,-6), 12);
    }); 
})
