/**
 * 字符串转数字
 * @param {Number} number 数字
 * @param {Number} radix 转换进制
 * @return {String}
 */
function covertNumberToString(number, radix = 10) {
    var integer = Math.floor(number);
    var fraction = number - integer;
    var string = '';

    while(integer > 0) {
        string = String(integer % radix) + string;
        integer = Math.floor(integer / radix);
    }
    
    if (fraction === 0) 
        return string;
    
    string += '.';
    var fractionLength = 1;
    while (fractionLength < 10) {
        fraction *= radix;
        string += Math.floor(fraction);
        fractionLength++;
    }

    return string;
}