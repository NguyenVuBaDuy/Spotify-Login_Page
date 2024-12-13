import showNotification from './notification.js'

const Validator = (option) => {

    const getParent = (inputElement, selector) => {
        var element = inputElement;
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    const handleEventOnBlur = (inputElement, rule) => {
        const errorElement = getParent(inputElement, option.group).querySelector(option.formWarning)
        const errorMessage = rule.test(inputElement.value)
        if (errorMessage) {
            errorElement.innerText = errorMessage
            errorElement.classList.add('invalid')
            inputElement.classList.add('invalid1')
        } else {
            errorElement.innerText = ''
            errorElement.classList.remove('invalid')
            inputElement.classList.remove('invalid1')
        }
        return !errorMessage
    }

    const handleEventStartInput = (inputElement) => {
        const errorElement = getParent(inputElement, option.group).querySelector(option.formWarning)
        errorElement.innerText = ''
        errorElement.classList.remove('invalid')
        inputElement.classList.remove('invalid1')
    }

    const handleSubmitForm = () => {
        var isFormValid = true;
        let email = ''
        option.rules.forEach((rule) => {
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement.id === 'email') {
                email = inputElement.value
            }
            var isValid = handleEventOnBlur(inputElement, rule);
            if (!isValid) {
                isFormValid = false;
            }
        })
        if (isFormValid) {

            const rememberElement = formElement.querySelector(option.remember)
            if (rememberElement.checked) {
                localStorage.setItem('saveEmail', email)
            }

            option.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                if (inputElement) {
                    inputElement.value = ''
                }
            })

            showNotification('Login Successfully', 'success', 'Welcome:))))')
        } else {
            showNotification('Login Failed', 'error', "Why don't you enter your email and password? Why? Why???")
        }
    }

    const formElement = document.querySelector(option.form)

    if (formElement) {

        option.rules.forEach((rule) => {
            const inputElement = formElement.querySelector(rule.selector)

            if (inputElement) {
                inputElement.onblur = () => { handleEventOnBlur(inputElement, rule) }

                inputElement.oninput = () => { handleEventStartInput(inputElement) }

                formElement.onsubmit = (event) => {
                    event.preventDefault()
                    handleSubmitForm()
                }
            }
        })
    }


}

Validator.isRequire = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value.trim() ? undefined : message || 'Please enter your information'
        }
    }
}

Validator({
    form: '.form-login-wrapped',
    formWarning: '.form-warning',
    group: '.form-login',
    buttonLogin: '.button-login',
    remember: '#remember',
    rules: [
        Validator.isRequire('#email', 'Email cannot be left blank'),
        Validator.isRequire('#password', 'Password cannot be left blank'),
    ]
})