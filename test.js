function max(obj) {
  let currMax = 1; //1
  for (let key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      currMax = Math.max(1 + max(obj[key]), currMax); // 1 + max({a:{b:true}}, 1 )
      //
    }
  }
  return currMax;
}


/*
{
a: {a: {b:true}}, --> 3
b: {a true},
c: {}
}
*/
console.log(max({ a: "1" })); // 1
console.log(max({ a: "1", b: { "c": 3 } })); // 2
console.log(max({ a: "1", b: { "c": { "c": 3 } } })); //3
console.log(max({ a: "1", b: { "c": { "c": 3 } }, c: { "d": 1 } })); //3