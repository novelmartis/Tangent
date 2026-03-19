document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form[data-application-form]");

  const normalizeValue = (value) => value.replace(/\s+/g, " ").trim();

  const hasMeaningfulText = (value) => {
    const normalized = normalizeValue(value);

    if (!normalized) {
      return false;
    }

    const alphaNumericCount = (normalized.match(/[A-Za-z0-9]/g) || []).length;
    return alphaNumericCount >= 2;
  };

  const hasSentenceLikeAnswer = (value) => {
    const normalized = normalizeValue(value);

    if (!hasMeaningfulText(normalized)) {
      return false;
    }

    const words = normalized
      .split(/\s+/)
      .filter((word) => /[A-Za-z0-9]/.test(word));
    const characterCount = normalized.replace(/\s/g, "").length;
    const endsLikeSentence = /[.!?](?:\s|$)/.test(normalized);

    return (words.length >= 5 && characterCount >= 20) || (endsLikeSentence && words.length >= 4);
  };

  forms.forEach((form) => {
    const fields = Array.from(form.querySelectorAll("input, textarea, select"));

    const syncConditionalRequirements = () => {
      fields.forEach((field) => {
        const controllerId = field.dataset.requiredWhenField;
        const requiredValue = field.dataset.requiredWhenValue;

        if (!controllerId || !requiredValue) {
          return;
        }

        const controller = form.querySelector(`#${controllerId}`);
        const shouldRequire = controller && controller.value === requiredValue;
        field.required = Boolean(shouldRequire);
      });
    };

    const validateField = (field) => {
      field.setCustomValidity("");

      if (field.disabled) {
        field.removeAttribute("data-invalid");
        field.setAttribute("aria-invalid", "false");
        return true;
      }

      const value = normalizeValue(field.value);

      if (field.required && !value) {
        field.setCustomValidity(field.dataset.requiredMessage || "This field is required.");
      } else if (value && field.dataset.requiresSentence !== undefined && !hasSentenceLikeAnswer(value)) {
        field.setCustomValidity("Please write at least one full sentence.");
      } else if (value && field.dataset.requiresMeaningful !== undefined && !hasMeaningfulText(value)) {
        field.setCustomValidity(field.dataset.meaningfulMessage || "Please enter a real answer.");
      }

      const isValid = field.checkValidity();

      if (isValid) {
        field.removeAttribute("data-invalid");
        field.setAttribute("aria-invalid", "false");
      } else {
        field.setAttribute("data-invalid", "true");
        field.setAttribute("aria-invalid", "true");
      }

      return isValid;
    };

    syncConditionalRequirements();

    fields.forEach((field) => {
      const eventName = field.tagName === "SELECT" ? "change" : "input";

      field.addEventListener(eventName, () => {
        syncConditionalRequirements();
        validateField(field);
      });

      field.addEventListener("blur", () => {
        syncConditionalRequirements();
        validateField(field);
      });
    });

    form.addEventListener("submit", (event) => {
      syncConditionalRequirements();

      let firstInvalidField = null;

      fields.forEach((field) => {
        const isValid = validateField(field);

        if (!isValid && !firstInvalidField) {
          firstInvalidField = field;
        }
      });

      if (firstInvalidField) {
        event.preventDefault();
        firstInvalidField.reportValidity();
        firstInvalidField.focus();
      }
    });
  });
});
