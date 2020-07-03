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


MyArray.prototype = myArrayProto;




const t = new MyArray(1, 2, 3);
alert(MyArray.isMyArray(t));