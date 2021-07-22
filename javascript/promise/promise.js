// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  status = PENDING;
  value = null;
  reason = null;
  onFulfilledCallbacks = []; // 存储成功回调函数
  onRejectedCallbacks = [];   // 存储失败回调函数
  constructor (executor) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.status = REJECTED;
      this.reject(error);
    }
  }

  resolve (value) {
    // 只有状态是等待，才执行状态修改
    if (value instanceof MyPromise) {
      value.then(resolve, reject);
      return;
    }
    // resolve被放入微任务队列中，同步代码执行完毕之后才会进入微任务队列执行。
    queueMicrotask(() => {
      if(this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn(value))
      }
    })
  }

  reject (reason) {
    // 只有状态是等待，才执行状态修改
    queueMicrotask(() => {
      if(this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn(reason))
      }
    })
  }


  // 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行
  then (onFulfilled, onRejected) {
    let promise2 = null;
    // 根据promise A+ 规范，then的参数不是function， 忽略
    // then 的参数 值的穿透
    // p1.then((value) => { // 此时p1.status 由pending状态 => fulfilled状态
    //   console.log(value); // resolve
    //   // console.log(p1.status); // fulfilled
    //   p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
    //       console.log(value); // 'resolve'
    //   });
    //     console.log('4444444');
    // })
    // console.log('333333');

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject); 
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject) 
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push((value) => {
          try {
            const x = onFulfilled(value);
            this.resolvePromise(x, resolve, reject) 
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedCallbacks.push((reason) => {
          try {
            const x = onRejected(reason);
            this.resolvePromise(x, resolve, reject); 
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return promise2;
  }

  resolvePromise(promise2, x, resolve, reject) {
    // 循环调用
    if (promise2 === x) {
      reject(new TypeError('Chaining cycle detected for promise!'))
      return
    }
    // 判断x是不是 MyPromise 实例对象
    if(x instanceof MyPromise) {
      // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
      // x.then(value => resolve(value), reason => reject(reason))
      // 简化之后
      x.then(resolve, reject)
    } else{
      // 普通值
      resolve(x)
    }
  }
}

module.exports = MyPromise;
