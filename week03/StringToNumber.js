/**
 * 字符串转数字
 * @param {String} string 字符串
 * @param {Number} radix 转换进制
 * @return {Number}
 */
function covertStringToNumber(string, radix) {
    var chars = string.split('');
    var number = 0;
    var i = 0;

    while (i < chars.length && chars[i] != '.') {
        number = number * radix;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i++;
    }

    if (chars[i] === '.') {
        i++;
    }

    var fraction = 1;

    while (i < chars.length) {
        fraction /= radix;
        console.log(fraction)
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i++;
    }

    return number;
}