const newOfferForm = document.querySelector('.ad-form');
const interactiveFormElements = document.querySelectorAll('.ad-form__element');
const formHeader = document.querySelector('.ad-form-header');

const toggleForm = () => {
  newOfferForm.classList.toggle('ad-form--disabled');

  interactiveFormElements.forEach((element) => {
    element.disabled = !element.disabled;
  });
  formHeader.disabled = !formHeader.disabled;
};

toggleForm();
toggleForm();