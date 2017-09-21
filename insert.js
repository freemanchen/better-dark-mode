let betterDarkModeTimeOut, betterDarkModeOriginalStyles;
//
// function openLinkedIn() {
//
//     Element.prototype.remove = function() {
//         this.parentElement.removeChild(this);
//     }
//
//     if (window.location.hostname.includes("linkedin.com")) {
//         if (document.getElementById("advocate-modal")) document.getElementById("advocate-modal").remove();
//         document.getElementsByTagName("body")[0].classList.remove("advocate-modal-visible");
//     }
// }
//
// openLinkedIn();

function darkMode(action) {
    if (action === 'enable') {
        betterDarkModeOriginalStyles = [];
        let elements = document.getElementsByTagName("*");
        let changeElements = [];
        for (let i = 0; i < elements.length; i++) {
            let el = elements[i];
            let bgColor = window.getComputedStyle(el).backgroundColor;
            let style = origStyle = el.getAttribute("style") === null ? "" : el.getAttribute("style") + ";";
            let changed = false;
            if (bgColor && !el.classList.contains("been-nice-bgcolored")) {
                origStyle += "background-color:" + bgColor + " !important;"
                style += "background-color:" + calcInverse(bgColor) + " !important;";
                el.classList.add("been-nice-bgcolored");
                changed = true;
            }
            let color = window.getComputedStyle(el).color;
            if (color && !el.classList.contains("been-nice-colored")) {
                origStyle += "color:" + color + " !important;"
                style += "color:" + calcInverse(color) + " !important;";
                el.classList.add("been-nice-colored");
                changed = true;
            }
            let borderColor = window.getComputedStyle(el).borderColor;
            if (borderColor && !el.classList.contains("been-nice-border-colored")) {
                origStyle += "border-color:" + borderColor + " !important;"
                style += "border-color:" + calcInverse(borderColor) + " !important;";
                el.classList.add("been-nice-border-colored");
                changed = true;
            }
            if (changed) {
                changeElements.push([el, style]);
                betterDarkModeOriginalStyles.push([el, style]);
            }
        }
        for (let j = 0; j < changeElements.length; j++) {
            let pair = changeElements[j];
            pair[0].setAttribute("style", pair[1]);
        }

        betterDarkModeTimeOut = setTimeout(function() {
            darkMode();
        }, 1000);
    }
    else if (action === 'disable') {
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
    if (newColor < 50) newColor = 50;
    if (newColor > 200) newColor = 200;
    return newColor;
}
