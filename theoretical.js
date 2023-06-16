// Write code inside the functions
// You will have to figure out what parameters to include
// All functions must use recursion

function lengthOfString(str, len = 0) {
  // If the length is 0 (base case), return len (0).
  // if (str.length === 0) return len;
  if (!str.length) return len;

  // Remove the first letter of the string
  let restOfString = str.substring(1);

  // Call function again, with updated string and len
  return lengthOfString(restOfString, ++len);
}

function sumOfArray(arr, sum = 0, index = 0) {
  // This function returns the sum of all of the numbers in a given array.
  if (index === arr.length) {
    return sum;
  }
  sum += arr[index];
  return sumOfArray(arr, sum, index + 1);
}

function findMax(arr, max = arr[0], index = 1) {
  // This function returns the largest number in a given array.
  if (index === arr.length) {
    return max;
  }
  max = arr[index] > max ? arr[index] : max;
  return findMax(arr, max, index + 1);
}

function factorial(num) {
  // This function returns the factorial of a given number.
  if (num <= 1) {
    return 1;
  } else return num * factorial(num - 1);
}

function fibonacci(num) {
  // This function returns the Nth number in the fibonacci sequence.
  // https://en.wikipedia.org/wiki/Fibonacci_number
  // For this function, the first two fibonacci numbers are 1 and 1
  if (num < 2) {
    return 1;
  } else return fibonacci(num - 1) + fibonacci(num - 2);
}

function coinFlips(num, str = "", arr = []) {
  // This function returns an array of all possible outcomes from flipping a coin N times.
  // Input type: Integer
  // For example, coinFlips(2) would return the following:
  // ["HH", "HT", "TH", "TT"]
  // H stands for Heads and T stands for tails
  // Represent the two outcomes of each flip as "H" or "T"

  if (num === 0) {
    arr.push(str);
    return arr;
  }

  coinFlips(num - 1, str + "H", arr);
  coinFlips(num - 1, str + "T", arr);
  return arr;
}

function letterCombinations(arr, str = "", index = 0) {
  // This function returns an array of all combinations of the given letters
  // Input type: Array of single characters
  // For example, letterCombinations(["a","b","c"]) would return the following:
  // ["a","b","c","ab","ac","ba","bc","ca","cb","abc","acb","bac","bca","cab","cba"]
  if (index === arr.length) {
    arr.push(str);
    return arr;
  }

  for (let i = 0; i < arr.length; i++) {
    letterCombinations(arr, str + arr[i]);
  }
  return arr;
}

module.exports = {
  lengthOfString,
  sumOfArray,
  findMax,
  factorial,
  fibonacci,
  coinFlips,
  letterCombinations,
};
