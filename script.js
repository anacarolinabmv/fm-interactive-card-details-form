'use strict';

const inputCardholder = document.getElementById('cardholder');
const inputCardNumber = document.getElementById('card--number');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const btnConfirm = document.getElementById('submit');

const validateForm = function () {};

const restoreError = function (element) {
  const errorLabel = element.parentElement.querySelector('small');
  errorLabel.classList.remove('display--error');
};

const renderError = function (element) {
  const errorLabel = element.parentElement.querySelector('small');
  errorLabel.classList.add('display--error');
};

const validateName = function () {
  const cardName = inputCardholder.value;
  if (!cardName) {
    renderError(inputCardholder);
    return;
  }
};

const validateCardNumber = function () {
  const cardNumber = inputCardNumber.value;
  if (!cardNumber) {
    renderError(inputCardNumber);
    return;
  }

  const regex = /^[0-9\s]*$/;
  const test = regex.test(cardNumber);

  if (!test) renderError(inputCardNumber);
};

btnConfirm.addEventListener('click', (event) => {
  event.preventDefault();
  validateName();
  validateCardNumber();
});
inputCardholder.addEventListener('focus', function () {
  restoreError(this);
});
inputCardNumber.addEventListener('focus', function () {
  restoreError(this);
});
