const getParent = (element, selector) => {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

var icons = {
    success: "fa-solid fa-circle-check",
    error: "fa-solid fa-circle-exclamation",
    warning: "fa-solid fa-circle-exclamation",
    info: "fa-solid fa-circle-info"
}
const notification = ({
    title = 'Info',
    message = "Default message",
    type = 'info',
    duration = 3000
}) => {
    const main = document.getElementById('notification');
    if (main) {
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification', `notification--${type}`);
        notificationElement.style.animation = `slideInLeft ease .3s, disappear ease 1s 3s forwards`;
        var icon = icons[type];
        notificationElement.innerHTML = `
            <div class="notification__icon">
                    <i class="${icon}"></i>
                </div>
                <div class="notification__body">
                    <h2 class="notification__title">
                        ${title}
                    </h2>
                    <div class="notification__msg">
                    ${message}
                    </div> 
                </div>
                <div class="notification__close">
                    <i class="fa-solid fa-xmark"></i>
                </div>
        `;
        main.appendChild(notificationElement);
        var closeElement = notificationElement.querySelector('.notification__close');

        setTimeout(function () {
            main.removeChild(notificationElement);
        }, 4000);

        if (closeElement) {
            closeElement.onclick = function (event) {
                main.removeChild(notificationElement);
            }
        }
    }
}



const showNotification = (title, type, message = '') => {
    notification({
        title: title,
        message: message,
        type: type,
        duration: 3000
    });
}

export default showNotification