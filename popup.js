function disable() {
  chrome.tabs.executeScript({
    file: 'disable.js'
  });
}

function enable() {
  chrome.tabs.executeScript({
    file: 'enable.js'
  });
}

document.getElementById('better-dark-mode').addEventListener('click', darkModeCheck);


function darkModeCheck() {
    if (betterDarkModeEnabled === 'yes') {
    // if (document.getElementById('better-dark-mode').classList.contains('better-dark-mode-active')) {
        document.getElementById('better-dark-mode').classList.remove('better-dark-mode-active');
        localStorage.setItem("betterDarkModeEnabled","no");
        betterDarkModeEnabled = 'no';
        disable();
    }
    else {
        document.getElementById('better-dark-mode').classList.add('better-dark-mode-active');
        enable();
        localStorage.setItem("betterDarkModeEnabled","yes");
        betterDarkModeEnabled = 'yes';
    }
}

let betterDarkModeEnabled = localStorage["betterDarkModeEnabled"] || 'no';

if (betterDarkModeEnabled === 'yes') {
    enable();
    document.getElementById('better-dark-mode').classList.add('better-dark-mode-active');
}
