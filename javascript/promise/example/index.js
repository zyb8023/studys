const MyPromise = require('../promise');

const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok');
    }, 2002);
});

// p.then(res => {
//     console.log(11111);
//     console.log(res, 'res1');
// })

// p.then(res => {
//     console.log(2222222);
//     console.log(res, 'res2');
// })

p.then(res => {
    console.log(3333333);
    console.log(res, 'res3');
}).then(res => {

    console.log(res, '-----res');
}).then(res => {
    console.log(5555555);
})


// const p1 = p.then(res => {
//     console.log(res);
//     return p1;
// })