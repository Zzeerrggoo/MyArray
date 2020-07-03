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



MyArray.prototype = myArrayProto;




const t = new MyArray(1, 2, 3);
alert(MyArray.isMyArray(t));