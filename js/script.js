"use strict";

  const navMain = document.querySelector(`.main-nav`);
  const navToggle = document.querySelector(`.main-nav__toggle`);
  const entrance = document.querySelector(`.entrance`);
  const popup = document.querySelector(`.popup`);
  const closeButton = popup.querySelector(`.close-button`);
  const popupForm = popup.querySelector(`.popup-form`);
  const userLogin = popup.querySelector(`.user-login`);
  const userPassword = popup.querySelector(`.user-password`);

  navMain.classList.remove(`main-nav--nojs`);

  navToggle.addEventListener(`click`, function() {
    if (navMain.classList.contains(`main-nav--closed`)) {
      navMain.classList.remove(`main-nav--closed`);
      navMain.classList.add(`main-nav--opened`);
    } else {
      navMain.classList.add(`main-nav--closed`);
      navMain.classList.remove(`main-nav--opened`);
    }
  });

  let isStorageSupport = true;
  let storageLogin = ``;

  try {
    storageLogin = localStorage.getItem(`userLogin`);
  } catch (err) {
    isStorageSupport = false;
  }

  entrance.addEventListener(`click`, function(evt) {
    evt.preventDefault();
    popup.classList.add(`popup-show`);

    if (storageLogin) {
      userLogin.value = storageLogin;
      userPassword.focus();
    } else {
      userLogin.focus();
    }
  });

  closeButton.addEventListener(`click`, function(evt) {
    evt.preventDefault();
    popup.classList.remove(`popup-show`);
  });

  popupForm.addEventListener(`submit`, function(evt) {
    if (!userLogin.value) {
      evt.preventDefault();
      popup.offsetWidth = popup.offsetWidth;
    } else {
      if (isStorageSupport) {
        evt.preventDefault();
        localStorage.setItem(`userLogin`, userLogin.value);
      }
    }
  });

  window.addEventListener(`keydown`, function(evt) {
    if (evt.key === `Escape`) {
      if (popup.classList.contains(`popup-show`)) {
        evt.preventDefault();
        popup.classList.remove(`popup-show`);
      }
    }
  });
