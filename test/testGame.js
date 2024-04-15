const assert = require('chai').assert;
const expect = require('chai').assert; 
/* dont fix problem, still installed
const { JSDOM } = require('jsdom');
const {loadImage} = require('p5');
*/
let {state, preload, setup, draw} = require('../Krill/game');
const {loadTileSprites, loadKrillAni, loadTiles} = require('../Krill/tiles');


describe('Game file', function(){
    describe('Before Preload', function(){
        it('state should be initialized to "editor"', function(){ 
            assert.equal(state, 'editor');
        });
    });
    /* calling preload causes problems, like idk how to test anything useful since its all instide the p5 functions which have a million dependencies
    preload();
    describe('After Preload', function(){
        it('state should be initialized to "title"', function(){ 
            assert.equal(state, 'title');
        });
    });
    */
});