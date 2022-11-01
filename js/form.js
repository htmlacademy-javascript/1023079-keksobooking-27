const newOfferForm = document.querySelector('.ad-form');

const makeFormInactive = () => {
  newOfferForm.classList.add('ad-form--disabled');
  const interactiveFormElements = document.querySelectorAll('.ad-form__element');
  const formHeader = document.querySelector('.ad-form-header');
  interactiveFormElements.forEach((element) => {
    element.disabled = true;
  });
  formHeader.disabled = true;
};


const makeFormActive = () => {
  newOfferForm.classList.remove('ad-form--disabled');
  const interactiveFormElements = document.querySelectorAll('.ad-form__element');
  const formHeader = document.querySelector('.ad-form-header');
  interactiveFormElements.forEach((element) => {
    element.disabled = false;
  });
  formHeader.disabled = false;
};

makeFormInactive();