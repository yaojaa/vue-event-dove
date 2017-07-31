//jQuery.extend 就是 deepcopy，没有必要再写一遍 写的挺好 但还是替换吧 
export default var deepCopy ＝ function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined && typeof value !=='object') {
          target[prop] = value;
        }else{
          deepCopy(value)
        }
      }
    }
  }
  return target;
}