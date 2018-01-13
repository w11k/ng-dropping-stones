export const clone = obj => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (Array.isArray(obj)) {
    var clonedArr = [];
    obj.forEach(function (element) {
      clonedArr.push(clone(element))
    });
    return clonedArr;
  }
  let clonedObj = new obj.constructor();
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      clonedObj[prop] = clone(obj[prop]);
    }
  }
  return clonedObj;
}
