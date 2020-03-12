const customPromiseAllSettled = promises => {
  let allPromises = promises.map(p =>
    Promise.resolve(p).then(
      val => ({ state: "fulfilled", value: val }),
      err => ({ state: "rejected", reason: err })
    )
  );
  return Promise.all(allPromises);
};

Promise._allSettled = customPromiseAllSettled;

// Пример использования
const pr1 = new Promise((res, _) => setTimeout(() => res(1), 1000));
const pr2 = new Promise((_, rej) => setTimeout(() => rej(2), 2000));
const arr = [pr1, pr2];
const res = Promise._allSettled(arr);

res.then(a =>
  console.log("Массив с результатами выполнения массива промисов:", a)
);
