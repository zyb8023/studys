const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok');
  }, 1000);
});

p.then(res => console.log(res));
