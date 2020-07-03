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

