const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

const validators = {
    email(value) {
        if (!value.trim()) {
            return 'Email is required.';
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            return 'Enter a valid email address.';
        }
        return '';
    },
    password(value) {
        if (!value.trim()) {
            return 'Password is required.';
        }
        if (value.length < 8) {
            return 'Password must be at least 8 characters.';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            return 'Password needs at least one special character.';
        }
        if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
            return 'Password should include both uppercase and lowercase letters.';
        }
        return '';
    }
};

function validateField(input, errorElement, validatorName) {
    const errorMessage = validators[validatorName](input.value);
    input.classList.toggle('invalid', Boolean(errorMessage));
    errorElement.textContent = errorMessage;
    return !errorMessage;
}

emailInput.addEventListener('input', () => {
    validateField(emailInput, emailError, 'email');
});

passwordInput.addEventListener('input', () => {
    validateField(passwordInput, passwordError, 'password');
});

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const emailValid = validateField(emailInput, emailError, 'email');
    const passwordValid = validateField(passwordInput, passwordError, 'password');

    if (emailValid && passwordValid) {
        alert('Form submitted successfully.');
        loginForm.reset();
        emailInput.classList.remove('invalid');
        passwordInput.classList.remove('invalid');
        emailError.textContent = '';
        passwordError.textContent = '';
    }
});
