const customPromiseAny = promises => {
  return Promise.all(
    promises.map(p => {
      return p.then(
        value => Promise.reject(value),
        err => Promise.resolve(err)
      );
    })
  ).then(
    errors => Promise.reject(errors),
    val => Promise.resolve(val)
  );
};

Promise._any = customPromiseAny;

// Пример использования
const resAny = Promise._any(arr);

resAny.then(a => console.log(`Первый промис выполнился с результатом - ${a}`));
