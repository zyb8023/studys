const MyPromise = require('../promise');

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok');
  }, 2000);
});

p.then(res => {
  console.log(res, '------res');
}).then(res => {
  console.log(222222222);
})