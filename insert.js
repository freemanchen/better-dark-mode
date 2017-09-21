

function openLinkedIn() {

    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }

    if (window.location.hostname.includes("linkedin.com")) {
        if (document.getElementById("advocate-modal")) document.getElementById("advocate-modal").remove();
        document.getElementsByTagName("body")[0].classList.remove("advocate-modal-visible");
    }
}

openLinkedIn();

function darkMode() {
    let elements = document.getElementsByTagName("*");
    let changeElements = [];
    for (let i = 0; i < elements.length; i++) {
        let el = elements[i];
        let bgColor = window.getComputedStyle(el).backgroundColor;
        let style = el.getAttribute("style") === null ? "" : el.getAttribute("style") + ";";
        let changed = false;
        if (bgColor && !el.classList.contains("been-nice-bgcolored")) {
            style += "background-color:" + calcInverse(bgColor) + " !important;";
            el.classList.add("been-nice-bgcolored");
            changed = true;
        }
        let color = window.getComputedStyle(el).color;
        if (color && !el.classList.contains("been-nice-colored")) {
            el.classList.add("been-nice-colored");
            style += "color:" + calcInverse(color) + " !important;";
            changed = true;
        }
        let borderColor = window.getComputedStyle(el).borderColor;
        if (borderColor && !el.classList.contains("been-nice-border-colored")) {
            el.classList.add("been-nice-border-colored");
            style += "border-color:" + calcInverse(borderColor) + " !important;";
            changed = true;
        }
        if (changed) changeElements.push([el, style]);
    }
    for (let j = 0; j < changeElements.length; j++) {
        let pair = changeElements[j];
        pair[0].setAttribute("style", pair[1]);
    }

    setTimeout(function() {
        darkMode();
    }, 4000);
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

darkMode();
