let betterDarkModeTimeOut;
let changeElements = [];
let betterDarkModeOriginalStyles = [];
var currentMin = localStorage["betterDarkModeMin"] || 50;
var currentMax = localStorage["betterDarkModeMax"] || 200;

function darkMode(action, reset) {
    reset = reset || false;
    if (reset) {
        for (let m = 0; m < betterDarkModeOriginalStyles.length; m++) {
            let pair = betterDarkModeOriginalStyles[m];
            pair[0].setAttribute("style", pair[1]);
            pair[0].classList.remove('been-nice-bgcolored');
            pair[0].classList.remove('been-nice-colored');
            pair[0].classList.remove('been-nice-border-colored');
        }
        betterDarkModeOriginalStyles = [];
        changeElements = [];
    }
    if (action === 'enable') {
        let elements = document.getElementsByTagName("*");
        for (let i = 0; i < elements.length; i++) {
            let el = elements[i];
            let bgColor = window.getComputedStyle(el).backgroundColor;
            let style = el.getAttribute("style") === null ? "" : el.getAttribute("style") + ";";
            let origStyle = el.getAttribute("style") === null ? "" : el.getAttribute("style") + ";";
            let changed = false;
            if (bgColor && !el.classList.contains("been-nice-bgcolored")) {
                style += "background-color:" + calcInverse(bgColor) + " !important;";
                el.classList.add("been-nice-bgcolored");
                changed = true;
            }
            let color = window.getComputedStyle(el).color;
            if (color && !el.classList.contains("been-nice-colored")) {
                style += "color:" + calcInverse(color) + " !important;";
                el.classList.add("been-nice-colored");
                changed = true;
            }
            let borderColor = window.getComputedStyle(el).borderColor;
            if (borderColor && !el.classList.contains("been-nice-border-colored")) {
                style += "border-color:" + calcInverse(borderColor) + " !important;";
                el.classList.add("been-nice-border-colored");
                changed = true;
            }
            if (changed) {
                changeElements.push([el, style]);
                betterDarkModeOriginalStyles.push([el, origStyle]);
            }
        }
        for (let k = 0; k < betterDarkModeOriginalStyles.length; k++) {
            let pair = betterDarkModeOriginalStyles[k];
            pair[0].setAttribute("style", pair[1]);
        }
        for (let j = 0; j < changeElements.length; j++) {
            let pair = changeElements[j];
            pair[0].setAttribute("style", pair[1]);
        }

        betterDarkModeTimeOut = setTimeout(function() {
            darkMode("enable", false);
        }, 2000);
    }
    else if (action === 'disable') {
        clearTimeout(betterDarkModeTimeOut);
        for (let j = 0; j < betterDarkModeOriginalStyles.length; j++) {
            let pair = betterDarkModeOriginalStyles[j];
            pair[0].setAttribute("style", pair[1]);
        }
    }
}

function calcInverse(str) {
    let color = str.toString().replace("rgb(", "").replace("rgba(","").replace(")", "").split(",");
    let newColor = color[3] ? "rgba(" : "rgb(";
    newColor += maxMinNum(color[0]) + "," + maxMinNum(color[1]) + "," + maxMinNum(color[2]);
    if (color[3]) newColor += "," + (color[3]);
    newColor += ")";
    return newColor;
}

function maxMinNum(num) {
    newColor = 255 - parseInt(num);
    if (newColor < currentMin) newColor = currentMin;
    if (newColor > currentMax) newColor = currentMax;
    return newColor;
}


if (localStorage["betterDarkModeEnabled"] === 'yes') darkMode('enable');
