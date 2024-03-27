let a = [1, 1, 1, 1, 1, 1, 1, 1, 1]
let b = [0, 0, 0, 0, 0, 0, 0, 1, 1]
let c=[];

for (let i = 0; i < a.length; i++) {
    c[i] = a[i]-b[i];
}

console.log(c);

console.log(typeof String(123));