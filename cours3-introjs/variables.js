console.log(":: variables.js ::");

var foo = 0;
console.log(foo); // 0

foo = foo + 2;
console.log(foo); // 2

foo = "Mon nom est ";
foo += "Julien";
console.log(foo); // "Mon nom est Julien"

var bar = foo + ":-)"
console.log(bar); // "Mon nom est Julien :-)"
