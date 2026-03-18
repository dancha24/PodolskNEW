const header = document.querySelector(".header");
const menuButton = document.querySelector(".header__menu-button");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const onScroll = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", onScroll);
onScroll();

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

document.querySelectorAll(".reveal-step").forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.2}s`;
});

const consultationModal = document.querySelector("#consultation-modal");
const consultationOpenButtons = document.querySelectorAll(".js-open-consultation-modal");

if (consultationModal && consultationOpenButtons.length) {
  const consultationCloseButtons = consultationModal.querySelectorAll("[data-modal-close]");

  const openConsultationModal = () => {
    consultationModal.hidden = false;
    document.body.classList.add("modal-open");
    consultationModal.querySelector('input[name="name"]')?.focus();
  };

  const closeConsultationModal = () => {
    consultationModal.hidden = true;
    document.body.classList.remove("modal-open");
  };

  consultationOpenButtons.forEach((button) => {
    button.addEventListener("click", openConsultationModal);
  });

  consultationCloseButtons.forEach((button) => {
    button.addEventListener("click", closeConsultationModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !consultationModal.hidden) {
      closeConsultationModal();
    }
  });
}

const validators = {
  name(value) {
    if (!value.trim()) return "Введите имя";
    if (value.trim().length < 2) return "Имя слишком короткое";
    return "";
  },
  phone(value) {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "Введите телефон";
    if (digits.length < 10) return "Укажите корректный телефон";
    return "";
  },
  service(value) {
    if (!value) return "Выберите тип услуги";
    return "";
  },
  consent(value, input) {
    if (input?.type === "checkbox" && !input.checked) return "Нужно согласие на обработку данных";
    if (!value) return "Поле обязательно";
    return "";
  },
};

function getErrorElement(input) {
  if (input.type === "checkbox") {
    return input.closest(".checkbox-field")?.querySelector(".field__error") || null;
  }
  return input.closest(".field, label, .cta__form")?.querySelector(".field__error") || null;
}

function setFieldError(input, message) {
  const errorEl = getErrorElement(input);
  if (errorEl) errorEl.textContent = message;

  if (input.type === "checkbox") return;
  input.style.borderColor = message ? "#d63031" : "";
}

function validateField(input) {
  const value = input.type === "checkbox" ? (input.checked ? "1" : "") : input.value;
  const validate = validators[input.name];

  if (validate) {
    return validate(value, input);
  }

  if (input.required && !value.trim()) {
    return "Поле обязательно";
  }

  return "";
}

document.querySelectorAll(".js-lead-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let hasErrors = false;
    const fields = form.querySelectorAll("input[required], select[required], textarea[required]");
    fields.forEach((field) => {
      const message = validateField(field);
      setFieldError(field, message);
      if (message) hasErrors = true;
    });

    if (hasErrors) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const success = form.querySelector(".lead-form__success");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.style.opacity = "0.7";
      submitButton.style.cursor = "not-allowed";
    }

    if (success) {
      success.hidden = false;
    }

    fields.forEach((field) => {
      if (field.type === "checkbox") {
        field.checked = false;
      } else {
        field.value = "";
        field.style.borderColor = "";
      }
    });

    setTimeout(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.style.opacity = "";
        submitButton.style.cursor = "";
      }
    }, 30000);
  });
});
