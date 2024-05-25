export const checkArrays = <T extends object>(x: T[], y: T[]) => {
  if (x.length !== y.length) return true;
  for (var index in x) {
    const first = x[index];
    const second = y[index];
    const checkArr = Object.keys(first).map(
      (item) => first[item as keyof T] === second[item as keyof T]
    );
    if (checkArr.includes(false)) return true;
  }
  return false;
};
