const MyPromise = require('../promise');

// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('ok');
//   }, 2000);
// });

// p.then(res => {
//   console.log(res, '------res');
// }).then(res => {
//   console.log(222222222);
// })



// const p = new Promise((resolve, reject) => {
//   console.log(1)
//   setTimeout(() => {
//     console.log(2)
//     resolve(8);
//   }, 2000);
// })

// p.then().then().then(res => console.log(res))


// const p1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(8);
//   }, 2000);
// })

// p.then().then().then(res => console.log(res))


  // p1.then((value) => { // 此时p1.status 由pending状态 => fulfilled状态
  //     console.log(value); // resolve
  //     // console.log(p1.status); // fulfilled
  //     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
  //         console.log(value); // 'resolve'
  //     });
  //     console.log('4444444');
  // })
  // console.log('333333');


Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})
