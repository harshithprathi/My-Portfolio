(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let action = form.getAttribute('action');
      if (!action) {
        displayError(form, 'Form action is not set!');
        return;
      }

      const loading = form.querySelector('.loading');
      const errorMessage = form.querySelector('.error-message');
      const successMessage = form.querySelector('.sent-message');

      loading.classList.add('d-block');
      errorMessage.classList.remove('d-block');
      successMessage.classList.remove('d-block');

      const subjectInput = form.querySelector('#subject-field');
      const subjectHidden = form.querySelector('input[name="_subject"]');
      if (subjectInput && subjectHidden) {
        subjectHidden.value = `Contact Request from your Portfolio: ${subjectInput.value}`;
      }

      const formData = new FormData(form);

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      })
        .then(response => {
          loading.classList.remove('d-block');
          if (response.ok) {
            successMessage.classList.add('d-block');
            form.reset();
            setTimeout(() => {
              window.location.href = 'projects/thankyouPage.html';
            }, 500);
            // window.location.href = 'projects/thankyouPage.html';
          } else {
            return response.json().then(data => {
              throw new Error(data.message || 'Form submission failed');
            });
          }
        })
        .catch(error => {
          loading.classList.remove('d-block');
          errorMessage.textContent = error.message + " Try contacting me on provided Email/LinkedIn.";
          errorMessage.classList.add('d-block');
        });
    });
  });

  function displayError(form, error) {
    form.querySelector('.loading').classList.remove('d-block');
    const errorMessage = form.querySelector('.error-message');
    errorMessage.textContent = error;
    errorMessage.classList.add('d-block');
  }
})();
