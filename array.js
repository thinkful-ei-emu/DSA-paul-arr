const Memory = require('./memory.js');
const memory= new Memory();
class myArray {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }
  push(value){
    if(this.length >= this._capacity){
      this._resize((this.length+1)* myArray.SIZE_RATIO);
    }
    memory.set(this.ptr+this.length,value);
    this.length++;
  }
  _resize(size){
    let oldPtr=this.ptr;
    this.ptr=memory.allocate(size);
    if (this.ptr===null) throw new Error('no more space');
    memory.copy(this.ptr,oldPtr,this.length);
    memory.free(oldPtr);
    this._capacity=size;
  }
  get(i){
    if(i<0 || i>= this.length){
      throw new Error('out of bounds');
    }
    return memory.get(this.ptr+i);
  }
  pop(){
    if(this.length===0) throw new Error('empty');
    this.length--;
    return memory.get(this.ptr+this.length);
  }
  insert(i,val){
    if(i<0 || i>= this.length){
      throw new Error('out of bounds');
    }
    if(this.length >= this._capacity){
      this._resize((this.length+1)* 2);
    }
    memory.copy(this.ptr+i+1,this.ptr+i, this.length-i);
    memory.set(this.ptr+i,val);
    this.length++;
  }
  remove(i){
    if(i<0 || i>= this.length){
      throw new Error('out of bounds');
    }
    memory.copy(this.ptr+i,this.ptr+i+1, this.length-i-1);
    this.length--;
  }

}
myArray.SIZE_RATIO=3;


function main(){
  myArray.SIZE_RATIO=3;
  let arr=new myArray();
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  arr.pop();
  arr.pop();
  arr.pop();
  //length will go down by 3, capacity will be unchanged, start address also unchanged.
  console.log(arr);
  console.log(arr.get(0));
  while(arr.length>0){
    arr.pop();
  }
  arr.push('t');
  console.log(arr);
  console.log(arr.get(0)); //gets NaN
  //


  //it's used when the arr's capacity needs to get bigger

}




main();

