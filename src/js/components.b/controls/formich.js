import {setInputValid, setInputInvalid, validateInput} from "./input-validator.js"

const buttonClasses = {
  disabled: "button--disabled",
};

function extractUTM(form) {
  const urlParams = new URLSearchParams(window.location.search);

  // Запись значений UTM-меток в соответствующие поля формы
  const utmSource = form.querySelector('input[name="utm_source"]');
  if (utmSource) {
    utmSource.value = urlParams.get('utm_source') || '';
  }
  const utmMedium = form.querySelector('input[name="utm_medium"]');
  if (utmMedium) {
    utmMedium.value = urlParams.get('utm_medium') || '';
  }
  const utmCampaign = form.querySelector('input[name="utm_campaign"]');
  if (utmCampaign) {
    utmCampaign.value = urlParams.get('utm_campaign') || '';
  }
  const utmContent = form.querySelector('input[name="utm_content"]');
  if (utmContent) {
    utmContent.value = urlParams.get('utm_content') || '';
  }
  const utmTerm = form.querySelector('input[name="utm_term"]')
  if (utmTerm) {
    utmTerm.value = urlParams.get('utm_term') || '';
  }

  // Запись значения referer в соответствующее поле формы
  const referer = form.querySelector('input[name="referer"]');
  if (referer) {
    referer.value = document.referrer || '';
  }

  // Запись времени отправки формы в соответствующее поле
  const requestTime = form.querySelector('input[name="requestTime"]')
  if (requestTime) {
    requestTime.value = Date.now();
  }

  // Запись простой подписи (например, md5 хэш) для защиты от подделки данных на клиенте
  // document.querySelector('input[name="requestSimpleSign"]').value = 'Ваша простая подпись';
}

function getSubmitButton(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  return submitButton;
}

function getSubmitButtonTextNode(form) {
  let buttonTextNode;
  const submitButton = getSubmitButton(form)
  const submitButtonText = submitButton.querySelector('.button__text')

  if (submitButtonText) {
    buttonTextNode = submitButtonText;
  } else {
    buttonTextNode = submitButton;
  }

  return buttonTextNode;
}

function setSubmitButtonText(form, text) {
  const submitButton = getSubmitButton(form);
  if (!submitButton) return;

  if (!submitButton.innerText) return;
  let buttonText;
  const submitButtonTextNode = getSubmitButtonTextNode(form);

  buttonText = submitButtonTextNode.innerText;
  submitButton.dataset.buttonText = buttonText;

  submitButtonTextNode.innerText = text;
}

function setFormStatusLoading(form) {
  setSubmitButtonText(form, 'Загрузка');
}

function setFormStatusOk(form) {
  setSubmitButtonText(form, '✓');
}

function resetSubmitButtonText(form) {
  const submitButton = getSubmitButton(form);
  if (!submitButton) return;

  if (!submitButton.innerText) return;
  let buttonText = submitButton.dataset.buttonText;

  const submitButtonTextNode = getSubmitButtonTextNode(form);
  submitButton.classList.remove(buttonClasses.disabled);
  submitButtonTextNode.innerText = buttonText;
}

function enableSubmitButton(form) {
  const submitButton = getSubmitButton(form);
  if (!submitButton) return;

  if (!submitButton.innerText) return;
  submitButton.classList.remove(buttonClasses.disabled);
  submitButton.disabled = false;
}

function disableSubmitButton(form) {
  const submitButton = getSubmitButton(form);
  if (!submitButton) return;

  submitButton.classList.add(buttonClasses.disabled);
  submitButton.disabled = true;
}


async function onFormSuccess(event) {
  const {form, formData} = event.detail;

  disableSubmitButton(form);
  setFormStatusLoading(form);

  let response = await fetch(form.action, {
    method: "POST",
    body: formData,
  });
  // if (form.classList.contains('js_form--debug')) {
    try {
      let result = await response.json();

      if (result.has_referer_redirect) {
        window.location.href = result.referer.replace(window.location.origin, '');
      }

      if (result.status) {
        // console.log('success')
        setFormStatusOk(form)
      }
    } catch {
      console.warn('form return error')
      // window.b_modal.openPop('modal-error')
      resetSubmitButtonText(form)
      enableSubmitButton(form)
    }
  // }

  form.reset();
  setTimeout(() => {
    resetSubmitButtonText(form)
    enableSubmitButton(form)
  }, 10000);
}

window.addEventListener('DOMContentLoaded', (event) => {
  const formsList = document.querySelectorAll(".js_form");
  formsList.forEach((form) => {
    if (form.classList.contains('js_form--init')) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      extractUTM(form);


      const inputsToValidate = [
        ...form.querySelectorAll('.js_form__control')
      ];
      inputsToValidate.forEach((input) => {
        validateInput(input);
      });
      let invalidInputs = [...form.querySelectorAll('.is-invalid')];
      if (invalidInputs.length != 0) return

      const formData = new FormData(form);
      const successValidEvent = new CustomEvent('submit:valid', {
        detail: {
          form,
          formData,
          event,
        }
      });
      form.dispatchEvent(successValidEvent);
    });

    form.addEventListener('submit:valid', onFormSuccess);

    form.classList.add('js_form--init');
  });


  // #region input-labels
  const inputs = document.querySelectorAll(".js_form .js_form__control");

  const inputClasses = {
    invalid: "is-invalid",
    init: "input--init",
    active: "input--active",
    dropdown: "input--dropdown",
    activeDropdown: "input--active-dropdown",
    selectedDropdown: "input--selected-dropdown",
  };

  function activateInput(input) {
  //   input.classList.add(inputClasses.active);
  }
  function deactivateInput(input) {
  //   input.classList.remove(inputClasses.active);
  }

  function initInputs(inputs) {
    inputs.forEach((input) => {
      if (input.classList.contains(inputClasses.init)) return;
      input.classList.add(inputClasses.init);

      const field = input.querySelector("[required]");

      input.addEventListener("click", (e) => {
        if (!e.target.classList.contains("input__field")) return;
        if (input.classList.contains(inputClasses.activeDropdown)) {
          deactivateInput(input);
        } else {
          activateInput(input);
        }
      });

      if (!field) return;

      field.addEventListener("focus", () => {
        activateInput(input);
        // setInputValid(input);
      });
      field.addEventListener("blur", () => {
        deactivateInput(input);
        if (field.value != "") {
          validateInput(input);
        }
      });

      field.addEventListener('input', () => {
        setInputValid(input);
      });
      field.addEventListener('change', () => {
        setInputValid(input);
      })

      if (field.type != "email" && field.type != "tel") {
        field.addEventListener("input", (e) => {
          validateInput(input);
        });
      }

      if (field.value !== "") {
        input.classList.add(inputClasses.active);
      }
    });
  }

  initInputs(inputs);

  // #endregion input-labels


  /*

       window.addEventListener('load', function(){
          return;
          let loc = document.getElementById("855929640f27f2de67f");
          loc.value = window.location.href;
          let ref = document.getElementById("855929640f27f2de67fref");
          ref.value = document.referrer;

          let statUrl = "https://academychiptuning.by/stat/counter?ref=" + encodeURIComponent(document.referrer)
              + "&loc=" + encodeURIComponent(document.location.href);
          document.getElementById('gccounterImgContainer').innerHTML
              = "<img width=1 height=1 style='display:none' id='gccounterImg' src='" + statUrl + "'/>";
      });

  */
});
