function indexOfStr (str1, str2) {
  return str1.indexOf(str2)
}
function subStr (str1, str2) {
  return str1.subString(0, str2)
}
// 导出
module.exports.indexOf = indexOf
module.exports.subStr = subStr