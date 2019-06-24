// Зависимости: utils.js, list-wizards.js, change-view-wizard.js, backend.js
// Выполняемые задачи: Создание окна персонажа (setup) и работа с ним

'use strict';

(function () {
  var SETUP_START_COORD_Y = '80px';
  var SETUP_START_COORD_X = '932px';

  var setupSimilar = document.querySelector('.setup-similar');

  var setupOpenButton = document.querySelector('.setup-open');
  var setupWindow = document.querySelector('.setup');
  // var formWizard = setupWindow.querySelector('.setup-wizard-form');
  var dialogHandler = setupWindow.querySelector('.upload');
  var setupCloseButton = setupWindow.querySelector('.setup-close');
  var userNameInput = setupWindow.querySelector('.setup-user-name');
  var wizardCoat = setupWindow.querySelector('.wizard-coat');
  var wizardCoatClass = '.wizard-coat';
  var wizardCoatInputName = 'coat-color';
  var wizardEyes = setupWindow.querySelector('.wizard-eyes');
  var wizardEyesClass = '.wizard-eyes';
  var wizardEyesInputName = 'eyes-color';
  var wizardVariableStyleChange = 'fill: ';
  var fireball = setupWindow.querySelector('.setup-fireball-wrap');
  var fireballClass = '.setup-fireball-wrap';
  var fireballInputName = 'fireball-color';
  var fireballVariableStyleChange = 'background-color: ';

  var wizardCoatColorsList = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var wizardEyesColorsList = ['black', 'red', 'blue', 'yellow', 'green'];
  var wizardFireballColorsList = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var showElement = function (element) {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      element.style = 'top: ' + SETUP_START_COORD_Y + '; left: ' + SETUP_START_COORD_X;
    }
  };

  var showPopUp = function (element) {
    showElement(element);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var hidePopup = function (element) {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE && (evt.target !== userNameInput)) {
      hidePopup(setupWindow);
    }
  };

  /* var hidePopupOnLoadData = function (responce) {
    if (responce === 200) {
      hidePopup(setupWindow);
    }
  }; */

  setupOpenButton.addEventListener('click', function () {
    showPopUp(setupWindow);
    window.backend.load(window.generate.generateWizards, window.generate.generateWizards);
    showElement(setupSimilar);
  });

  setupOpenButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      showPopUp(setupWindow);
      window.backend.load(window.generate.generateWizards, window.utils.onErrormessage);
      showElement(setupSimilar);
    }
  });

  setupCloseButton.addEventListener('click', function () {
    hidePopup(setupWindow);
  });

  setupCloseButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      hidePopup(setupWindow);
    }
  });

  wizardCoat.addEventListener('click', function () {
    window.wizard.changeColors(setupWindow, wizardCoatClass, wizardCoatInputName, wizardCoatColorsList, wizardVariableStyleChange);
  });

  wizardEyes.addEventListener('click', function () {
    window.wizard.changeColors(setupWindow, wizardEyesClass, wizardEyesInputName, wizardEyesColorsList, wizardVariableStyleChange);
  });

  fireball.addEventListener('click', function () {
    window.wizard.changeColors(setupWindow, fireballClass, fireballInputName, wizardFireballColorsList, fireballVariableStyleChange);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    window.utils.moveWindow(evt, setupWindow, dialogHandler);
  });

  /* formWizard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formWizard), hidePopupOnLoadData, window.utils.onErrormessage);
  }); */
})();
