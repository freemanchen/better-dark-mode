

function openLinkedIn() {

    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }

    if (window.location.hostname.includes('linkedin.com')) {
        document.getElementById('advocate-modal').remove();
        document.getElementsByTagName('body')[0].classList.remove('advocate-modal-visible');
    }
}

openLinkedIn();

function darkMode() {
    let elements = document.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
        let bgColor = window.getComputedStyle(elements[i]).backgroundColor;
        let style = elements[i].getAttribute('style') === null ? '' : elements[i].getAttribute('style') + ';';
        if (bgColor) {
            style += 'background-color:' + calcInverse(bgColor) + ' !important;';
        }
        let color = window.getComputedStyle(elements[i]).color;
        console.log(color);

        if (color) {
            style += 'color:' + calcInverse(color) + ' !important;';
        }
        elements[i].setAttribute('style', style);
    }
}

function calcInverse(str) {
    let color = str.toString().replace('rgb(', '').replace('rgba(','').replace(')', '').split(',');
    let newColor = color[3] ? 'rgba(' : 'rgb(';
    newColor += maxMinNum(color[0]) + ',' + maxMinNum(color[1]) + ',' + maxMinNum(color[2]);
    if (color[3]) newColor += ',' + color[3];
    newColor += ')'
    return newColor;
}

function maxMinNum(num) {
    return newColor = 255 - parseInt(num);
    if (newColor < 50) {
        newColor = 50;
    }
    if (newColor > 210) {
        newColor = 210;
    }
    return newColor;
}

darkMode();
