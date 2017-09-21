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

document.getElementById('better-dark-mode').addEventListener('click', function() {
    if (document.getElementById('better-dark-mode').classList.contains('better-dark-mode-active')) {
        document.getElementById('better-dark-mode').classList.remove('better-dark-mode-active');
        disable();
    }
    else {
        document.getElementById('better-dark-mode').classList.add('better-dark-mode-active')
        enable();
    }
});
