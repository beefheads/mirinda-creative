
function disableDefaultInvalid() {
	// Выключает стандартные подсказки валидации
	document.addEventListener(
	  "invalid",
	  (function (e) {
	    return function (e) {
	      e.preventDefault();
	      const input = e.target.closest('.js_form__control');
	      setInputInvalid(input);

        if (e.target.form.querySelector('.is-invalid') == undefined) return
        e.target.form.querySelector('.is-invalid').focus();
	    };
	  })(),
	  true
	);
}
disableDefaultInvalid();

export function setInputInvalid(input) {
  if (input.classList.contains('iti')) input = input.parentElement

  input.classList.add("is-invalid");
  const field = input.querySelector('[required]');

  let isValid;

  if (field.validity != null) {
  	isValid = field.validity.valid;
  } else if (field.checked) {
  	isValid = field.checked;
  }

  if (field.validationMessage) {
	  changeErrorText(input);
	}

  return isValid;
}

export function setInputValid(input) {
  input.classList.remove("is-invalid");
  const field = input.querySelector("[required]");

  let isValid;
  if (field.validity != null) {
  	isValid = field.validity.valid;
  } else if (field.checked) {
  	isValid = field.checked;
  }

  if (field.validationMessage) {
	  changeErrorText(input);
  }
  return isValid;
}

export function changeErrorText(input) {
  // return
  const field = input.querySelector("[required]");
  const error = input.querySelector(".input__message");
  if (error) {
    error.innerText = field.validationMessage;
  }
}

export function validateInput(input) {
  // return
  const field = input.querySelector("[required]");
  if (field == null) return;

  if (field.type == "tel") {
    return validatePhone(input);
  } else if (field.type == "email") {
    return validateEmail(input);
  } else {
    return validateInputLength(input);
  }
}

export function validateInputLength(input) {
  // return
  const field = input.querySelector("[required]");
  if (field.value.length == 0) {
    return setInputInvalid(input);
  } else {
    return setInputValid(input);
  }
}

export function validatePhone(input) {
  // return
  const field = input.querySelector("[required]");
  // let regex = /^(\+7|8)\s?\(?[489][0-9]{2}\)?\s?[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{2}$/;
  let regex = /^\+7\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
  if (regex.test(field.value)) {
    return setInputValid(input);
  } else {
    return setInputInvalid(input);
  }
}

export function validateEmail(input) {
  // return
  const field = input.querySelector("[required]");
  let regex =
    // eslint-disable-next-line no-control-regex
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!regex.test(field.value)) {
    return setInputInvalid(input);
  } else {
    return setInputValid(input);
  }
}
