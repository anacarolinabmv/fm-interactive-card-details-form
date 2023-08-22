'use strict';

const inputCardholder = document.getElementById('cardholder');
const inputCardNumber = document.getElementById('card--number');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const inputCVC = document.getElementById('security');
const btnConfirm = document.getElementById('submit');
const btnContinue = document.getElementById('continue');
const appContainer = document.querySelector('.app--container');
const successContainer = document.querySelector('.success--container');

const init = function () {
  appContainer.style.display = 'flex';
  successContainer.style.display = 'none';
  inputCardholder.value =
    inputCardholder.value =
    inputCardNumber.value =
    inputYear.value =
    inputMonth.value =
    inputCVC.value =
      '';

  const currentYear = new Date().getFullYear();
  inputYear.setAttribute('min', currentYear);
  inputYear.setAttribute('max', currentYear + 10);
};

init();

const validateForm = function () {
  const passed = validateName() && validateCardNumber() && validateDate() && validateCVC();
  if (passed) renderSuccess();
};

const restoreError = function (element) {
  const errorLabel = element.parentElement.querySelector('small');
  errorLabel.classList.remove('display--error');
  element.classList.remove('error--border');
};

const renderError = function (element, msg) {
  const errorLabel = element.parentElement.querySelector('small');
  errorLabel.classList.add('display--error');
  element.classList.add('error--border');
  errorLabel.textContent = msg;
};

const renderSuccess = function () {
  appContainer.style.display = 'none';
  successContainer.style.display = 'flex';
};

const validateName = function () {
  const cardName = inputCardholder.value;
  if (!cardName) {
    renderError(inputCardholder, 'Field cannot be empty');
    return;
  }
  return true;
};

const validateCardNumber = function () {
  const cardNumber = inputCardNumber.value;
  if (!cardNumber) {
    renderError(inputCardNumber, 'Field cannot be empty');
    return;
  }
  const regex = /^[0-9\s]*$/;
  const test = regex.test(cardNumber);

  if (!test) {
    renderError(inputCardNumber, 'Wrong format. Numbers only');
    return;
  }
  return true;
};

const validateDate = function () {
  if (!inputMonth.value || !inputYear.value) {
    renderError(inputMonth, 'Field cannot be empty');
    renderError(inputYear, 'Field cannot be empty');
    return;
  }
  return true;
};
const validateCVC = function () {
  if (!inputCVC.value) {
    renderError(inputCVC, 'Field cannot be empty');
    return;
  }
  return true;
};

btnConfirm.addEventListener('click', (event) => {
  event.preventDefault();
  validateName();
  validateCardNumber();
  validateDate();
  validateCVC();
  validateForm();
});

btnContinue.addEventListener('click', init);

const restoreInputError = (input) => {
  const restoreInputErrorSibling = (sibling) => {
    input.addEventListener('focus', () => {
      sibling.classList.remove('error--border');
    });
  };

  if (input === inputMonth) {
    const sibling = input.nextElementSibling;
    restoreInputErrorSibling(sibling);
  }
  if (input === inputYear) {
    const sibling = input.previousElementSibling;
    restoreInputErrorSibling(sibling);
  }

  input.addEventListener('focus', function () {
    const errorLabel = input.parentElement.querySelector('small');
    errorLabel.classList.remove('display--error');
    input.classList.remove('error--border');
  });
};

restoreInputError(inputCardholder);
restoreInputError(inputCardNumber);
restoreInputError(inputMonth);
restoreInputError(inputYear);
restoreInputError(inputCVC);
