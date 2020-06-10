let body = document.querySelector('body');
let styles = getComputedStyle(body);
let findStyles = [];

for (let property of styles) {
    if (property.indexOf('-webkit-') == -1) {
        findStyles.push(property)
    }
}
