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
        describe('View Variable', function(){
            it('should have the property [x] and its value should be [0]', function(){ 
                expect(view).to.have.property('x', 0); 
            });
            it('should have the property [y] and its value should be [0]', function(){ 
                expect(view).to.have.property('y', 0); 
            });
            it('should have the property [zoom] and its value should be [2]', function(){ 
                expect(view).to.have.property('zoom', 2); 
            });
            it('should have the property [tool] and its value should be [select]', function(){ 
                expect(view).to.have.property('tool', 'select'); 
            });
            it('should have the property [tool] and its value should be [false]', function(){ 
                expect(view).to.have.property('cameraLocked', false); 
            });
        });
    });
});




