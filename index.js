'use strict';

var _ = require('lodash');

function AnySet(initialSet){

  if(typeof initialSet !== 'undefined' && typeof initialSet !== 'object'){
    throw new Error('initialSet must be an object');
  }

  this._elements = initialSet || {};
}

AnySet.prototype = {
  _generateKey: function(rawKey){
    return JSON.stringify(rawKey);
  },
  get: function(rawKey){
    var key = this._generateKey(rawKey);

    if(key in this._elements){
      return this._elements[key];
    }else{
      return null;
    }
  },
  has: function(rawKey){
    return (key in this._elements);
  },
  merge: function(rawKey, response){
    var key = this._generateKey(rawKey);

    this._elements[key] = this._elements[key] || {};

    _.assign(this._elements[key], response);
  },
  put: function(rawKey, response){
    this.add(rawKey, response);
  },
  add: function(rawKey, response){
    this._elements[this._generateKey(rawKey)] = response;
  },
  toString: function(){
    return JSON.stringify(this._elements);
  },
  clear: function(){
    var elements = this._elements;
    var key;

    for(key in elements){
      delete elements[key];
    }
  }
};

module.exports = AnySet;