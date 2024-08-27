const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorEl.textContent = inputEl.validationMessage;
  errorEl.classList.add(errorClass);
};

const hideInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorEl.textContent = "";
  errorEl.classList.remove(errorClass);
};

const checkInputValidity = (formEl, inputEl, options) => {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }

  hideInputError(formEl, inputEl, options);
};

const hasInvalidInput = (inputList) => {
  return !inputList.every((inputEl) => inputEl.validity.valid);
};

const disableButton = (buttonEl, { inactiveButtonClass }) => {
  buttonEl.classList.add(inactiveButtonClass);
  buttonEl.disabled = true;
};

const enableButton = (buttonEl, { inactiveButtonClass }) => {
  buttonEl.classList.remove(inactiveButtonClass);
  buttonEl.disabled = false;
};

const toggleButtonState = (inputEls, buttonEl, options) => {
  if (hasInvalidInput(inputEls)) {
    disableButton(buttonEl, options);
    return;
  }
  enableButton(buttonEl, options);
};

const setEventListeners = (formEl, options) => {
  const { inputSelector } = options;
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const buttonEl = formEl.querySelector(".modal__button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, buttonEl, options);
    });
  });
};

const enableValidation = (options) => {
  const formEls = Array.from(document.querySelectorAll(options.formSelector));
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, options);
  });
};

enableValidation(config);
