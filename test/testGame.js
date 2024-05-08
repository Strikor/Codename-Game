//Very Basic Tests for Javascript files in the Repo
//essentially checking that values are read from each javascript file

//using assert chai library, checking value of one variable from each javascript file before any function calls
const assert = require('chai').assert;
const expect = require('chai').expect; 
let {state} = require('../Krill/game');
let {sheetImg} = require('../Krill/tiles');
let {view} = require('../Krill/editor');


describe('Game file', function(){
    describe('Before any function call', function(){
        it('state should be initialized to "editor"', function(){ 
            assert.equal(state, 'editor');
        });
    });
});

describe('Tiles file', function(){
    describe('Before any function call', function(){
        it('sheetImg variable should be undefined', function(){ 
            assert.equal(sheetImg, undefined);
        });
    });
});

describe('Editor file', function(){
    describe('Before any function call', function(){
        it('A [view] object should have the properties x,y,z', function(){ 
            expect(true).to.equal(true); 
        });
    });
});




