//It's O(N) where N is the length of the string.
//everything inside the forloop is O(1)
// arr.push is amortized O(1),
//So that's O(N)
//and for arr.join, it's O(N) where N is the length of the 
//string that is being combined. At worst it's O(3N), so we're good.
function urlify(str) {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) !== ' ') arr.push(str.charAt(i));
    else arr.push('%20');
  }
  return arr.join('');
}
console.log(urlify('yo  what be up '));


//It's O(N) where N is the length of the arr.
//the first forLoop runs for N iterations, and each time only takes O(1) amortized.
//second forloop runs for at most N iterations, and each time only takes O(1) amoritzed.
//So O(N).
function filterFive(arr) {
  let newarr = [];
  //Add all stuff into newarr that you want to keep
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 5) newarr.push(arr[i]);
  }

  //I think question implies that the original array be changed
  //otherwise can return newarr here.

  //remove all stuff in arr
  arr.length = 0;
  //put in newarr stuff into arr
  newarr.forEach(element => arr.push(element));
}

let arr = [1, 5, 5, 2, 5, 3, 4, 5];
filterFive(arr);
console.log(arr);


//O(N), basically loops through an array of size N twice, each iteration only O(1) amortized.
function maxSumInArr(arr) {
  let sumArr = [];
  let currentSum = 0;
  //Note in sumArr, whenever the currentsum dips below 0, i just set the sum back to 0, keeping track of how negative it gets is counterproductive. This is fine, because if your continuous sequence starts at the index immediately to the right, no matter how much farther left you move the start index, it only lowers your sum. If it didn't, then it would contradict the fact that the currentsum dipped below 0. 
  //To see this, change every 0 into a divider in sumArr, and use this example:
  //arr=    [-1, 5,-2, 3,-7, 1,-2,-1, 5, 2,-6]   
  //sumArr= [ 0, 5, 3, 6, 0, 1, 0, 0, 5, 7, 1]
  //w/ div= [ |, 5, 3, 6, |, 1, |, |, 5, 7, 1]
  // and apply those dividers to the arr. Note that it doesn't make sense to have the startIndex of our maximum sum sequence to be an index whose sumArr value is 0 (for this to happen the value at the index must be negative or zero).
  //             5,-2, 3     1        5, 2, -6
  //So these are the only candidates from which can be our starting element. Consider each little sequence block (like 5,-2,3). if our endIndex is in that sequence, it makes sense that startIndex starts from the very left of that sequence. Once startIndex is at the very left of the sequence block, note that moving the startIndex to the left, can only make the sum smaller or unchanged (since you're adding partial sequence blocks which sum up to negative or zero values). 
  arr.forEach(element => {
    currentSum += element;
    if (currentSum < 0) {
      currentSum = 0;
    }
    sumArr.push(currentSum);
  });
  let max = 0;
  sumArr.forEach(sum => {
    if (sum > max) max = sum;
  });
  return max;
}

arr = [4, 6, -3, 5, -2, 1];
console.log(maxSumInArr(arr));
arr = [-1, 5, -2, 3, -7, 1, -2, -1, 5, 2, -6];
console.log(maxSumInArr(arr));


//O(N+M) where N,M is the size of arr, arr2 resp.
function mergeArrays(arr, arr2) {
  let ptr = 0;
  let ptr2 = 0;
  const merge = [];
  while (ptr < arr.length || ptr2 < arr2.length) {
    if (!(ptr < arr.length)) {
      merge.push(arr2[ptr2]);
      ptr2++;
    }
    else if (!(ptr2 < arr2.length)) {
      merge.push(arr[ptr]);
      ptr++;
    }
    else if (arr[ptr] < arr2[ptr2]) {
      merge.push(arr[ptr]);
      ptr++;
    }
    else {
      merge.push(arr2[ptr2]);
      ptr2++;
    }
  }
  return merge;
}
let arr2 = [2, 3, 5, 8, 9, 10];
arr = [1, 3, 6, 8, 11];
console.log(mergeArrays(arr, arr2));

//assuming concat is handled well, O(N)
function remChars(str, charsToBeRem) {
  let arr = [];
  //I want to check for the characters in charsToBeRem, in
  //hopefully constant time, so can use hash table.
  let hash = {};
  for (let i = 0; i < charsToBeRem.length; i++) {
    hash[charsToBeRem.charAt(i)] = true;
  }
  for (let i = 0; i < str.length; i++) {
    if (!(hash[str.charAt(i)])) {
      arr.push(str.charAt(i));
    }
  }
  return ''.concat(...arr);
}
let str = 'Battle of the Vowels: Hawaii vs. Grozny'
let str2 = 'aeiou';
console.log(remChars(str, str2));

//O(N) where N is size of arr, assuming that our numbers are bound in size, so multiplication is just O(1)
function prod(arr) {
  let product = arr.reduce((prod, element) => prod * element, 1);
  return arr.map(element => product / element);
}
arr = [1, 3, 9, 4];
console.log(prod(arr));


//2D array
//Do this with constant memory, in O(N^2) time
function setToZero(arr) {
  //I'm assuming it is rectangular.
  let firstRowHasZero = false;
  let firstColHasZero = false;
  //check firstRow has 0
  arr[0].forEach(num => {
    if (num === 0) firstRowHasZero = true;
  });
  //check firstCol has 0
  for (let r = 0; r < arr.length; r++) {
    if (arr[r][0] === 0) {
      firstColHasZero = true;
    }
  }
  for (let r = 0; r < arr.length; r++) {
    for (let c = 0; c < arr[r].length; c++) {
      if (arr[r][c] === 0) {
        //using firstrow and firstcol
        //to keep track of which rows and which cols to set to zero.
        arr[0][c] = 0;
        arr[r][0] = 0;
      }
    }
  }

  //going through the first row, skip the first column element
  //I don't want to destroy the first column yet.
  for (let c = 1; c < arr[0].length; c++) {
    if (arr[0][c] === 0) {
      //then kill the entire column
      for (let r = 0; r < arr.length; r++) {
        arr[r][c] = 0;
      }
    }
  }
  //going through first column, avoid first row for now.
  for (let r = 1; r < arr[0].length; r++) {
    if (arr[r][0] === 0) {
      //then kill the entire row
      for (let c = 0; c < arr[r].length; c++) {
        arr[r][c] = 0;
      }
    }
  }

  //kill FirstRow if need be
  if(firstRowHasZero){
    for (let c = 0; c < arr[0].length; c++) {
      arr[0][c]=0;
    }
  }
  //kill FirstCol if need be
  if(firstColHasZero){
    for (let r = 0; r < arr.length; r++){
      arr[r][0]=0;
    }
  }
  return arr;

}

arr = [[1, 0, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1]];

console.log(setToZero(arr));

//Idea is that given word "amazon", if you take the word
//"amazonamazonamazon" every rotation should show up
//then all you have to do is use .includes, to see if the rotated version is there.
//And also if you are included in "amazonamazonamazon" and are the same length as amazon, then you're definitely a rotation.
//if we aren't allowed to use .includes, then this would take me a while to make runtime pretty optimal, because the knuth-m-p algorithm always takes a bit of time for me (like let's say like an hour+ every time I try it)
//Assuming JS uses KMP or something better, then this is O(N) where N is the length of the string
function isRotation(rot,ori){
  if(rot.length!==ori.length){
    return false;
  }
  let tripleOri=ori+ori+ori; //oh yeah just ori+ori should work
  if(tripleOri.includes(rot)) return true;
  return false;
}
str='amazon';
str2='azonma';
console.log(isRotation(str2,str));
str='amazon';
str2='azonam';
console.log(isRotation(str2,str));

