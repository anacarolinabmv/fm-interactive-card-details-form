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

let allValid;

const init = function () {
  allValid = false;
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
  validateName();
  validateCardNumber();
  validateDate();
  validateCVC();
  if (allValid) renderSuccess();
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
  allValid = true;
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
  allValid = true;
};

const validateDate = function () {
  if (!inputMonth.value || !inputYear.value) {
    renderError(inputMonth, 'Field cannot be empty');
    renderError(inputYear, 'Field cannot be empty');
    return;
  }
  allValid = true;
};
const validateCVC = function () {
  if (!inputCVC.value) {
    renderError(inputCVC, 'Field cannot be empty');
    return;
  }
  allValid = true;
};

btnConfirm.addEventListener('click', (event) => {
  event.preventDefault();
  validateForm();
});

btnContinue.addEventListener('click', init);
inputCardholder.addEventListener('focus', function () {
  restoreError(this);
});
inputCardNumber.addEventListener('focus', function () {
  restoreError(this);
});
inputMonth.addEventListener('focus', function () {
  restoreError(inputMonth);
  restoreError(inputYear);
});
inputYear.addEventListener('focus', function () {
  restoreError(inputMonth);
  restoreError(inputYear);
});
inputCVC.addEventListener('focus', function () {
  restoreError(this);
});
