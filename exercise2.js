/*
  step 1) order the array with some ordering algorithm like Quicksort.
  step 2) scan the array for every 2 consecutive numbers:
    case 1) if there is no second consecutive number, the first number is the solo one.
    case 2) if the first and the second numbers are different, the first number is the solo one again.

  This will always work because of the odd numbers rule. The array must be ordered for this to work.
  Arrays "arr1" and "arr2" give us all possible examples of ordered arrays for this setup.

  Tested on Chrome's console.
*/
const arr1 = [1, 1, 2, 2, 3];
const arr2 = [1, 1, 2, 3, 3];

const check = (arr) => {
  let i = 0;

  while (i < arr.length) {
    // case 1
    if (!arr[i + 1]) {
      return arr[i];
    }

    // case 2
    if (arr[i] !== arr[i + 1]) {
      return arr[i];
    }

    i += 2;
  }
};

console.log(check(arr1));
console.log(check(arr2));
