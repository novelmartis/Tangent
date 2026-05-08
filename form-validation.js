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
    const checkboxGroups = Array.from(form.querySelectorAll("[data-checkbox-group]"));

    const getFieldValue = (field) => {
      if (field.tagName === "SELECT" && field.multiple) {
        return Array.from(field.selectedOptions).map((option) => option.value);
      }

      return field.value;
    };

    const fieldHasRequiredValue = (fieldValue, requiredValue) => {
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(requiredValue);
      }

      return fieldValue === requiredValue;
    };

    const syncConditionalRequirements = () => {
      fields.forEach((field) => {
        const controllerId = field.dataset.requiredWhenField;
        const requiredValue = field.dataset.requiredWhenValue;

        if (!controllerId || !requiredValue) {
          return;
        }

        const controller = form.querySelector(`#${controllerId}`);
        const controllerValue = controller ? getFieldValue(controller) : "";
        const shouldRequire = controller && fieldHasRequiredValue(controllerValue, requiredValue);
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

      const rawValue = getFieldValue(field);
      const value = Array.isArray(rawValue) ? rawValue : normalizeValue(rawValue);
      const hasValue = Array.isArray(value) ? value.length > 0 : Boolean(value);

      if (field.required && !hasValue) {
        field.setCustomValidity(field.dataset.requiredMessage || "This field is required.");
      } else if (!Array.isArray(value) && value && field.dataset.requiresSentence !== undefined && !hasSentenceLikeAnswer(value)) {
        field.setCustomValidity("Please write at least one full sentence.");
      } else if (!Array.isArray(value) && value && field.dataset.requiresMeaningful !== undefined && !hasMeaningfulText(value)) {
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

    const validateCheckboxGroup = (group) => {
      const boxes = Array.from(group.querySelectorAll('input[type="checkbox"]'));
      const hasSelection = boxes.some((box) => box.checked);

      if (hasSelection) {
        group.removeAttribute("data-invalid");
        boxes.forEach((box) => box.setAttribute("aria-invalid", "false"));
        return true;
      }

      group.setAttribute("data-invalid", "true");
      boxes.forEach((box) => box.setAttribute("aria-invalid", "true"));
      return false;
    };

    syncConditionalRequirements();

    fields.forEach((field) => {
      const eventName = field.tagName === "SELECT" || field.type === "checkbox" ? "change" : "input";

      field.addEventListener(eventName, () => {
        syncConditionalRequirements();
        validateField(field);
      });

      field.addEventListener("blur", () => {
        syncConditionalRequirements();
        validateField(field);
      });
    });

    checkboxGroups.forEach((group) => {
      const boxes = group.querySelectorAll('input[type="checkbox"]');

      boxes.forEach((box) => {
        box.addEventListener("change", () => {
          validateCheckboxGroup(group);
        });
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

      checkboxGroups.forEach((group) => {
        const isValid = validateCheckboxGroup(group);

        if (!isValid && !firstInvalidField) {
          firstInvalidField = group.querySelector('input[type="checkbox"]');
        }
      });

      if (firstInvalidField) {
        event.preventDefault();
        if (firstInvalidField.type !== "checkbox") {
          firstInvalidField.reportValidity();
        }
        firstInvalidField.focus();
      }
    });
  });
});
