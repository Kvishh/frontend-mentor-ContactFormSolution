const inputs = document.querySelectorAll(".input");
const radioInputs = document.querySelectorAll('input[type="radio"]');
const checkboxInput = document.querySelector('input[type="checkbox"]');
const emailInvalidParagraph = document.querySelector(".error-email-invalid");

const errors = document.querySelectorAll(".error");
const form = document.querySelector("form");

form.addEventListener("submit", (evt) => {
  if (checkFormValid(evt)){
    evt.preventDefault();
    setTimeout(displayPopUp);
    setTimeout(removePopUp, 3000);
    setTimeout(()=>form.submit(), 3000);
  }
});

function checkInputsIfEmpty(evt){
  inputs.forEach((input, index) => {
    if (input.value === ""){
      evt.preventDefault();
      input.style.borderColor = "hsl(0, 66%, 54%)";
      errors[index].classList.add("error-required-visible");
      return true;
    } else {
      input.style.border = "1px solid hsl(169, 82%, 27%)";
      errors[index].classList.remove("error-required-visible");
      return false;
    }
  });
}

function checkRadioIfNotChecked(evt){
  if (!radioInputs[0].checked && !radioInputs[1].checked) {
    evt.preventDefault();
    errors[3].classList.add("error-required-visible");
    return true;
  } else {
    errors[3].classList.remove("error-required-visible");
    return false;
  }
}

function checkCheckboxIfNotChecked(evt) {
  if (!checkboxInput.checked){
    evt.preventDefault();
    errors[errors.length-1].classList.add("error-required-visible");
    return true;
  } else {
    errors[errors.length-1].classList.remove("error-required-visible");
    return false;
  }
}

function validateEmail(evt){
  const validator = /^\S+@\S+\.\S+$/;

  if (/^$/.test(inputs[2].value)) {
    evt.preventDefault();
    emailInvalidParagraph.classList.remove("error-invalid-visible");
    inputs[2].style.borderColor = "hsl(0, 66%, 54%)";
    return true;
  } else if (!validator.test(inputs[2].value)) {
    evt.preventDefault();
    emailInvalidParagraph.classList.add("error-invalid-visible");
    inputs[2].style.borderColor = "hsl(0, 66%, 54%)";
    return true;
  } else {
    inputs[2].style.border = "1px solid hsl(169, 82%, 27%)";
    emailInvalidParagraph.classList.remove("error-invalid-visible");
    return false;
  }

}

function displayPopUp(){
  document.querySelector(".pop-up").classList.add("pop-up-visible");
}

function removePopUp(){
  document.querySelector(".pop-up").classList.remove("pop-up-visible");
}

function checkFormValid(evt){
  const validations = [checkInputsIfEmpty(evt), validateEmail(evt), checkRadioIfNotChecked(evt), checkCheckboxIfNotChecked(evt)];
  
  if (validations.includes(true)){
    return false;
  } else {
    return true;
  }
}