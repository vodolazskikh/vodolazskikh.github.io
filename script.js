const { subtract, multiply, less } = Homework;

const promisify = (a, b, cb) => {
  // Промисифицируем, так как не хотим иметь дел с колбеками
  return new Promise((resolve, reject) => {
    cb(a, b, (script, err) => {
      if (err) {
        reject(err);
      } else {
        resolve(script);
      }
    });
  });
};

const promisifyMultiply = (a, b) => promisify(a, b, multiply);

const promisifySubtract = (a, b) => promisify(a, b, subtract);

const promisifyLess = (a, b) => promisify(a, b, less);

const getTriangleSq = async (x1, y1, x2, y2, x3, y3, cb) => {
  // Формулу для расчета взял тут
  // https://www.fxyz.ru/%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB%D1%8B_%D0%BF%D0%BE_%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B5/%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F_%D0%B3%D0%B5%D0%BE%D0%BC%D0%B5%D1%82%D1%80%D0%B8%D1%8F/%D0%BD%D0%B0_%D0%BF%D0%BB%D0%BE%D1%81%D0%BA%D0%BE%D1%81%D1%82%D0%B8/%D1%82%D0%BE%D1%87%D0%BA%D0%B8_%D0%B8_%D0%BF%D1%80%D1%8F%D0%BC%D1%8B%D0%B5_%D0%B2_%D0%BF%D1%80%D1%8F%D0%BC%D0%BE%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B5_%D0%BA%D0%BE%D0%BE%D1%80%D0%B4%D0%B8%D0%BD%D0%B0%D1%82/%D0%BF%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D1%8C_%D1%82%D1%80%D0%B5%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%B0_%D1%87%D0%B5%D1%80%D0%B5%D0%B7_%D0%BA%D0%BE%D0%BE%D1%80%D0%B4%D0%B8%D0%BD%D0%B0%D1%82%D1%8B/
  try {
    const subX1 = await promisifySubtract(x1, x3);
    const subX2 = await promisifySubtract(x2, x3);
    const subY1 = await promisifySubtract(y1, y3);
    const subY2 = await promisifySubtract(y2, y3);

    const mull1 = await promisifyMultiply(subX1, subY2);
    const mull2 = await promisifyMultiply(subX2, subY1);
    const sub = await promisifySubtract(mull1, mull2);
    const isNegative = await promisifyLess(sub, 0);

    const result = await promisifyMultiply(sub, isNegative ? -0.5 : 0.5);

    cb(result);
  } catch (err) {
    console.log("Молодой человек, у вас ошибочка, ", err);
  }
};

getTriangleSq(10, 10, 20, 10, 30, 80, sq =>
  console.log(`Площадь треугольника - ${sq}`)
);

getTriangleSq(1, 1, 2, 5, 5, 3, sq =>
  console.log(`Площадь треугольника - ${sq}`)
);
