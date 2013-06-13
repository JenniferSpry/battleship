function rand (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var numbers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var number = 0;

for (var i = 0; i < 10000; i++) {
  number = rand(20, 11);
  console.log(number);
  numbers[number-1]++;
}

console.log(numbers);