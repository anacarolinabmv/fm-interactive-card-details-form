'use strict';

const inputCardholder = document.getElementById('cardholder');
const inputCardNumber = document.getElementById('card--number');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const inputCVC = document.getElementById('security');
const btnConfirm = document.getElementById('submit');
const btnContinue = document.getElementById('continue');
const appContainer = document.querySelector('.form--container');
const successContainer = document.querySelector('.success--container');
let currentYear;

const init = function () {
  appContainer.classList.remove('hidden');
  successContainer.classList.add('hidden');
  inputCardholder.value =
    inputCardholder.value =
    inputCardNumber.value =
    inputYear.value =
    inputMonth.value =
    inputCVC.value =
      '';

  currentYear = new Date().getFullYear();

  inputYear.setAttribute('min', `${currentYear}`.slice(-2));
  inputYear.setAttribute('max', `${currentYear + 10}`.slice(-2));
};

init();

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
  const month = inputMonth.value;
  const year = inputYear.value;

  if (!month || !year) {
    renderError(inputMonth, 'Field cannot be empty');
    renderError(inputYear, 'Field cannot be empty');
    return;
  } else if (month.length < 2 || year.length < 2) {
    if (month.length < 2) {
      renderError(inputMonth, 'Must be two characters long');
    } else {
      renderError(inputYear, 'Must be two characters long');
    }
    return;
  } else if (
    (month < 1 || month > 12) &&
    (year < `${currentYear}`.slice(-2) || year > +`${currentYear}`.slice(-2) + 10)
  ) {
    renderError(inputMonth, 'Must be a valid date');
    renderError(inputYear, 'Must be a valid date');
    return;
  } else if (month < 1 || month > 12) {
    renderError(inputMonth, 'Must be a valid month');
  } else if (year < `${currentYear}`.slice(-2) || year > +`${currentYear}`.slice(-2) + 10) {
    renderError(inputYear, 'Must be a valid year');
  }

  return true;
};
const validateCVC = function () {
  const cvc = inputCVC.value;
  if (!cvc) {
    renderError(inputCVC, 'Field cannot be empty');
    return;
  }
  const regex = /^[0-9]*$/;
  const test = regex.test(cvc);
  if (test) return true;
};

const renderSuccess = function () {
  successContainer.classList.remove('hidden');
  appContainer.classList.add('hidden');
};

const validateForm = function () {
  const passed = validateName() && validateCardNumber() && validateDate() && validateCVC();
  if (passed) renderSuccess();
};

//Event handlers

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
