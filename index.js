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

  const res = [];

  for (let i = 0; i < this.length; ++i) {

    if (callback(this[i], i, this)) res.push(this[i]);

  }

  return res;

};


MyArray.prototype = myArrayProto;




const t = new MyArray(1, 2, 3);
alert(MyArray.isMyArray(t));