

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
