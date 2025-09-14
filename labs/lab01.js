// const input = "the quick brown fox"
// console.log (input)


// function capitalizeWords(str){
//   const words =str.trim().split(/\s+/);
//   return words;

// }
// console.log(capitalizeWords(input))

// function capOne(w) {
//   if (!w) return w;                     // güvenlik
//   return w[0].toUpperCase() + w.slice(1).toLowerCase();
// }
// console.log(capOne("bROWN")); // "Brown"


// function capitalizeWords(str) {
//   const words = str.trim().split(/\s+/);
//   const fixed = words.map(capOne);
//   return fixed; // geçici kontrol
// }

// function capitalizeWords(str) {
//   const words = str.trim().split(/\s+/);
//   const fixed = words.map(capOne);
//   return fixed.join(" ");
// }


// Q1

function capitalizeWords(str) {
  return str
    .trim()
    .split(/\s+/) 
    .map(w => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}
console.log(capitalizeWords("the quick brown fox"));

//Q2

function max(a,b,c) {
  let m =a;
  if (b> m) m = b;
  if (c > m ) m = c;
  return m;
}
console.log(max (1,0,1));
console.log(max (0,-10,-20));
console.log(max (1000,510,440));


// Q3
function right(a)
{
  if(typeof a !=="string") a = String(a);
  if(a.length > 3 )return a;
  return a.slice(-3) + a.slice(0,-3);

}
console.log(right("Python"));
console.log(right("Javascript"));
console.log(right("Hi"));


// Q4

function angleType(angleDegrees) {
  const right_angle = 90;
  const straightAngle = 180; 

  if (angleDegrees === straightAngle) return "Straight angle";
  if (angleDegrees === right_angle)   return "Right angle";
  if (angleDegrees > 0 && angleDegrees < right_angle) return "Acute angle";
  if (angleDegrees > right_angle && angleDegrees < straightAngle) return "Obtuse angle";
  return "Invalid angle";
}

console.log(angleType(47));   
console.log(angleType(90));  
console.log(angleType(145)); 
console.log(angleType(180));



