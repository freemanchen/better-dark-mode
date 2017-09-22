let currentMin = localStorage["betterDarkModeMin"] || 50;
let currentMax = localStorage["betterDarkModeMax"] || 200;
let betterDarkModeEnabled = localStorage["betterDarkModeEnabled"] || 'no';

function updateCurrentDisplays() {
    document.getElementById('min-current').innerHTML = 'Current: ' + currentMin;
    document.getElementById('max-current').innerHTML = 'Current: ' + currentMax;
}

function disable() {
  chrome.tabs.executeScript({
    code: 'var currentMin = ' + currentMin + '; var currentMax = ' + currentMax + ';localStorage.setItem("betterDarkModeMin",currentMin);localStorage.setItem("betterDarKModeMax",currentMax);clearTimeout(betterDarkModeTimeOut);darkMode("disable");localStorage.setItem("betterDarkModeEnabled","no");'
  });
}

function enable(reset) {
  reset = reset || false;
  if (reset) {
      chrome.tabs.executeScript({
        code: 'var currentMin = ' + currentMin + '; var currentMax = ' + currentMax + ';localStorage.setItem("betterDarkModeMin",currentMin);localStorage.setItem("betterDarKModeMax",currentMax); darkMode("enable", true);localStorage.setItem("betterDarkModeEnabled","yes");'
      });
  }
  else {
      chrome.tabs.executeScript({
        code: 'var currentMin = ' + currentMin + '; var currentMax = ' + currentMax + ';localStorage.setItem("betterDarkModeMin",currentMin);localStorage.setItem("betterDarKModeMax",currentMax); darkMode("enable");localStorage.setItem("betterDarkModeEnabled","yes");'
      });
  }
}

updateCurrentDisplays();
document.getElementById('min-range-input').value = currentMin;
document.getElementById('min-range-input').addEventListener('change', function() {
    currentMin = document.getElementById('min-range-input').value;
    localStorage.setItem("betterDarkModeMin",currentMin);
    updateCurrentDisplays();
    if (betterDarkModeEnabled === 'yes') {
        enable(true);
    }

});

document.getElementById('max-range-input').value = currentMax;
document.getElementById('max-range-input').addEventListener('change', function() {
    currentMax = document.getElementById('max-range-input').value;
    localStorage.setItem("betterDarkModeMax",currentMax);
    updateCurrentDisplays();
    if (betterDarkModeEnabled === 'yes') {
        enable(true);
    }
});

document.getElementById('min-default').addEventListener('click', function() {
    currentMin = 50;
    document.getElementById('min-range-input').value = currentMin;
    localStorage.setItem("betterDarkModeMin",currentMin);
    updateCurrentDisplays();
    if (betterDarkModeEnabled === 'yes') {
        enable(true);
    }
});

document.getElementById('max-default').addEventListener('click', function() {
    currentMax = 200;
    document.getElementById('max-range-input').value = currentMax;
    localStorage.setItem("betterDarkModeMax",currentMax);
    updateCurrentDisplays();
    if (betterDarkModeEnabled === 'yes') {
        enable(true);
    }
});

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


if (betterDarkModeEnabled === 'yes') {
    enable();
    document.getElementById('better-dark-mode').classList.add('better-dark-mode-active');
}
