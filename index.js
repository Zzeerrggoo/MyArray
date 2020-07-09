'use strict';

function MyArray() {

  if (!new.target) {
    return new MyArray(...arguments);
  }

  this.length = 0;

  for (let item of arguments) {
    this[this.length++] = item;
  }

}

MyArray.isMyArray = function(obj) {
  return obj instanceof MyArray;
};

const myArrayProto = MyArray();

myArrayProto.push = function() {

  for (let i = 0; i < arguments.length; ++i) {
    this[this.length++] = arguments[i];
  }

  return this.length;

};

myArrayProto.find = function(callback) {

  for (let i = 0; i < this.length; ++i) {

    if (callback(this[i], i, this))
      return this[i];

  }
};

myArrayProto.includes = function(searchElement, fromIndex = 0) {

  fromIndex < 0 && (fromIndex = this.length + fromIndex);

  for (let i = fromIndex; i < this.length; ++i) {

    if (this[i] === searchElement) return true;
  }

  return false;
};

myArrayProto.join = function(separator = ',') {

  if (this.length === 0) return '';

  let res = '';
  for (let i = 0; i < this.length - 1; ++i) {
    res += this[i] + separator;
  }

  res += this[this.length - 1];

  return res;

};

myArrayProto.filter = function(callback) {

  const res = new MyArray();

  for (let i = 0; i < this.length; ++i) {

    if (callback(this[i], i, this)) res.push(this[i]);

  }

  return res;

};

myArrayProto.map = function(callback) {

  const res = new MyArray();

  for (let i = 0; i < this.length; ++i) {

    res.push(callback(this[i], i, this));

  }

  return res;

};

myArrayProto.reduce = function(callback, initialValue = this[0]) {

  if (this.length === 1)
    return this;

  let accumulator = initialValue;

  for (let i = 0; i < this.length; ++i) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;

};

myArrayProto.flat = function flat(depth = 1) {

  if (depth === 0) return this;

  let res = [];

  for (let i = 0; i < this.length; ++i) {

    if (MyArray.isMyArray(this[i])) {
      res = res.concat(this[i].flat(depth - 1));
    } else {
      res = res.concat(this[i]);
    }
  }

  return res;

};

myArrayProto.pop = function() {

  const lastItem = this[this.length - 1];
  delete this[this.length - 1];
  this.length--;
  return lastItem;

};

MyArray.prototype = myArrayProto;

const t = new MyArray(1, 2, 3);
const t1 = [1,2,3];
