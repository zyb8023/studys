class MyPromise {
  constructor (executor) {
    const _this = this;
    _this.status = 'pending'; // promise状态 pending 、fulfilled 、rejected
    _this.data = undefined; // promise的值
    _this.onResolvedCallback = []; // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    _this.onRejectedCallback = [];
    function resolve (value) {
      if (_this.status === 'pending') {
        _this.status = 'fulfilled';
        _this.data = value;
        _this.onResolvedCallback.forEach(fn => fn(value));
      }
    }
    function reject (reason) {
      if (_this.status === 'pending') {
        _this.status = 'rejected';
        _this.data = reason;
        _this.onRejectedCallback.forEach(fn => fn(reason));
      }
    }
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then (onResolve, onReject) {
    const _this = this;
    let promise2 = null;
    // 根据promise A+标准，then的参数不是function ,会被忽略
    onResolve = typeof onResolve === 'function' ? onResolve : (value) => {};
    onReject = typeof onReject === 'function' ? onReject : (reason) => {};
    // 每个Promise对象都可以在其上多次调用then方法，而每次调用then返回的Promise的状态取决于那一次调用then时传入参数的返回值
    promise2 = new MyPromise((resolve, reject) => {
      if (_this.status === 'pending') {
        _this.onResolvedCallback.push((value) => {
          try {
            const x = onResolve(_this.data);
            if (x instanceof MyPromise) x.then(resolve, reject);
            else resolve(x);
          } catch (error) {
            reject(error);
          }
        });
        _this.onRejectedCallback.push((value) => {
          try {
            const x = onReject(_this.data);
            if (x instanceof MyPromise) x.then(resolve, reject);
            else resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }
      // 如果promise1(此处即为_this)的状态已经确定并且是fulfilled，我们调用onResolved
      if (_this.status === 'fulfilled') {
        try {
          const x = onResolve(_this.data);
          if (x instanceof MyPromise) x.then(resolve, reject);
        } catch (error) {
          reject(error);
        }
      }
      if (_this.status === 'rejected') {
        try {
          const x = onReject(_this.data);
          if (x instanceof MyPromise) x.then(resolve, reject);
        } catch (error) {
          reject(error);
        }
      }
    });
    return promise2;
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    return resolve('ok');
  }, 2000);
});

p.then(res => {
  console.log(res);
  return res;
}, err => console.log(err)).then(res => console.log(res, '------res23'));
