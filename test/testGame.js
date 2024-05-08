const assert = require('chai').assert;
const expect = require('chai').assert; 
/* dont fix problem, still installed
const { JSDOM } = require('jsdom');
const {loadImage} = require('p5');
*/
let {state, preload, setup, draw} = require('../Krill/game');
const {sheetImg} = require('../Krill/tiles');


describe('Game file', function(){
    describe('Before Preload', function(){
        it('state should be initialized to "editor"', function(){ 
            assert.equal(state, 'editor');
        });
    });
});

describe('Tiles file', function(){
    describe('Before loadTilesSprites()', function(){
        it('sheetImg variable should exist', function(){ 
            expect(sheetImg).exists;
        });
    });
});