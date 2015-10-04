'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)
// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

// TODO: First, make a constructor function, called Blob, that makes blobs. */
// TODO: Next, create an instance of Blob named blob.
// TODO: Then, use a loop to calculate how long it took the blob to finish
// with Dowington.

function Blob() {}

var blob = new Blob (); //this Blob instance lives in Dowington

var populationLeft = 1000;
var eatenThisHour = 1;
var hours = 0; //how long it takes to eat Dowington
while (populationLeft > 0) {
  populationLeft = populationLeft - eatenThisHour;
  if (populationLeft >= 0) {
    hours++;
    eatenThisHour++;
  }
  else { //this part adds in the fractional hour
    hours = hours + (populationLeft + eatenThisHour) / eatenThisHour;
  }
}

var hoursSpentInDowington = hours; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.
  // TODO: implement me based on the instructions above.
  // Be sure to then assign me to the Blob's prototype.
Blob.prototype.hoursToOoze = function(population, peoplePerHour) {
  var populationLeft = population;
  var eatenThisHour = peoplePerHour;
  var hours = 0;
  while (populationLeft > 0) {
    populationLeft = populationLeft - eatenThisHour;
    if (populationLeft >= 0) {
      hours++;
      eatenThisHour++;
    }
    else {
      hours = hours + (populationLeft + eatenThisHour) / eatenThisHour;
    }
  }
  return hours; //return needed because it is a function
};

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.
assert(blob.hoursToOoze(1035, 1) === 45, '(1035, 1): integer number of hours tested.');
assert(blob.hoursToOoze(1037, 1) === (45 + 2 / 46), '(1037, 1): blob finished before hour ended.');
assert(blob.hoursToOoze(20, 2) === 5, '(20, 2): blob started at 2 peoplePerHour');

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.
// TODO: specify a home planet and a language you'll need to add parameters to this constructor
function SentientBeing(homePlanet, language) {
  this.homePlanet = homePlanet;
  this.language =  language;
}
// sb is a SentientBeing object
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating
    //TODO: put this on the SentientBeing prototype
SentientBeing.prototype.sayHello = function(sb) {
  console.log(hello[this.language]);
  return hello[sb.language];
};

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

function Human() {
  this.homePlanet = 'Earth';
  this.language = 'federation standard';
}
Human.prototype = new SentientBeing();

function Klingon() {
  this.homePlanet = 'Qo\'noS';
  this.language = 'klingon';
}
Klingon.prototype = new SentientBeing();

function Romulan() {
  this.homePlanet = 'Romulus';
  this.language = 'romulan';
}
Romulan.prototype = new SentientBeing();

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the Klingon should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the Romulan should hear Jolan\'tru');

assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the Klingon should hear nuqneH');

assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the Human should hear hello');

assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the Romulan should hear Jolan\'tru');

assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the Human should hear hello');

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************
//TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

var test = ['999', '125', '44', '33']; //THIS IS A TEST
function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    if (a.slice(-1) < b.slice(-1)) { // the -1 value grabs the last character
      return -1;
    }
    if (a.slice(-1) > b.slice(-1)) {
      return 1;
    }
    return 0;
  }
  return stringArray.sort(byLastLetter);
}
//console.log("ARRAY: " + lastLetterSort(test).toString()); //THIS IS A TEST

test = ['aa', 'az', 'ba', 'bz'];
//console.log("ARRAY ORIG: " + test.toString()); //THIS IS A TEST
assert(lastLetterSort(test).toString() === 'aa,ba,az,bz',  'letter comparison');

//console.log("ARRAY: " + lastLetterSort(test).toString()); //THIS IS A TEST

test = ['44', '33', '125', '999'];
assert(lastLetterSort(test).toString() === '33,44,125,999',  'number comparison');

// // TODO: implement me using forEach
function sumArray(numberArray) {
  var sum = 0;
  var sumCallback = function(currentValue) { //currentValue holds each element of the array
    sum = sum + currentValue;
  };
  numberArray.forEach(sumCallback);
  return sum;
}

assert(sumArray([11, 44, 33]) === 88, 'positive number test');
assert(sumArray([11, 44, -22]) === 33,  'negative number test');

// // TODO: implement me using sumArray
//     //  order the arrays based on the sum of the numbers
//     //  inside each array
function sumSort(arrayOfArrays) {
  var sortedArrays = arrayOfArrays.slice(); //clones the array and returns the reference to the new array
  sortedArrays.sort(function compare(a, b) { //this is the compare function for sorting
    var findSumOfA = sumArray(a);
    var findSumOfB = sumArray(b);
    if (findSumOfA < findSumOfB) {
      return -1;
    }
    if (findSumOfA > findSumOfB) {
      return 1;
    }
    return 0;
  });
  //console.log(arrayOfArrays.toString()); //THIS IS A TEST
  //console.log(sortedArrays.toString()); //THIS IS A TEST
  return sortedArrays;
}
assert(sumSort([[1, 2], [100, 100], [30, 40]]).toString() === '1,2,30,40,100,100',
'positive number test');
assert(sumSort([[1, -2], [100, 100], [30, -40]]).toString() === '30,-40,1,-2,100,100',
'negative number test');

// //*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
