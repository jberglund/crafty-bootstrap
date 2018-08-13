const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const pipe = (...functions) => data =>
  functions.reduce((value, func) => func(value), data)

const map = f => x => Array.prototype.map.call(x, f);
const filter = f => x => Array.prototype.filter.call(x, f);
const reduce = f => x => Array.prototype.reduce.call(x, f);
