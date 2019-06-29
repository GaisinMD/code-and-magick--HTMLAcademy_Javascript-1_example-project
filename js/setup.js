// Зависимости: utils.js, list-wizards.js, change-view-wizard.js, backend.js
// Выполняемые задачи: Создание окна персонажа (setup) и работа с ним

'use strict';

(function () {
  var SetupStartCoord = {
    X: '932px',
    Y: '80px'
  };

  var url = {
    GET: 'https://js.dump.academy/code-and-magick/data',
    SEND: 'https://js.dump.academy/code-and-magick'
  };

  var setupSimilar = document.querySelector('.setup-similar');

  var setupOpenButton = document.querySelector('.setup-open');

  var setupWindow = document.querySelector('.setup');

  var setupWindowChildren = {
    FORM_WIZARD: setupWindow.querySelector('.setup-wizard-form'),
    DIALOG_HANDLER: setupWindow.querySelector('.upload'),
    SETUP_CLOSE_BUTTON: setupWindow.querySelector('.setup-close'),
    USER_NAME_INPUT: setupWindow.querySelector('.setup-user-name')
  };

  var wizard = {
    COAT: setupWindow.querySelector('.wizard-coat'),
    COAT_CLASS: '.wizard-coat',
    COAT_INPUT_NAME: 'coat-color',
    EYES: setupWindow.querySelector('.wizard-eyes'),
    EYES_CLASS: '.wizard-eyes',
    EYES_INPUT_NAME: 'eyes-color',
    FIREBALL: setupWindow.querySelector('.setup-fireball-wrap'),
    FIREBALL_CLASS: '.setup-fireball-wrap',
    FIREBALL_INPUT_NAME: 'fireball-color'
  };

  var wizardVariableStyleChange = 'fill: ';
  var fireballVariableStyleChange = 'background-color: ';

  var wizardCoatColorsList = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var wizardEyesColorsList = ['black', 'red', 'blue', 'yellow', 'green'];
  var wizardFireballColorsList = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var showElement = function (element) {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      element.style = 'top: ' + SetupStartCoord.Y + '; left: ' + SetupStartCoord.X;
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
    if (evt.keyCode === window.utils.ESC_KEYCODE && evt.target !== setupWindowChildren.USER_NAME_INPUT) {
      hidePopup(setupWindow);
    }
  };

  var hidePopupOnLoadData = function (responce) {
    if (responce) {
      hidePopup(setupWindow);
    }
  };

  setupOpenButton.addEventListener('click', function () {
    showPopUp(setupWindow);
    window.backend.load(url.GET, window.generate.generateWizards, window.utils.onErrormessage);
    showElement(setupSimilar);
  });

  setupOpenButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      showPopUp(setupWindow);
      window.backend.load(url.GET, window.generate.generateWizards, window.utils.onErrormessage);
      showElement(setupSimilar);
    }
  });

  setupWindowChildren.SETUP_CLOSE_BUTTON.addEventListener('click', function () {
    hidePopup(setupWindow);
  });

  setupWindowChildren.SETUP_CLOSE_BUTTON.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      hidePopup(setupWindow);
    }
  });

  wizard.COAT.addEventListener('click', function () {
    window.wizard.changeColors(setupWindow, wizard.COAT_CLASS, wizard.COAT_INPUT_NAME, wizardCoatColorsList, wizardVariableStyleChange);
  });

  wizard.EYES.addEventListener('click', function () {
    window.wizard.changeColors(setupWindow, wizard.EYES_CLASS, wizard.EYES_INPUT_NAME, wizardEyesColorsList, wizardVariableStyleChange);
  });

  wizard.FIREBALL.addEventListener('click', function () {
    window.wizard.changeColors(setupWindow, wizard.FIREBALL_CLASS, wizard.FIREBALL_INPUT_NAME, wizardFireballColorsList, fireballVariableStyleChange);
  });

  setupWindowChildren.DIALOG_HANDLER.addEventListener('mousedown', function (evt) {
    window.utils.moveWindow(evt, setupWindow, setupWindowChildren.DIALOG_HANDLER);
  });

  setupWindowChildren.FORM_WIZARD.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(url.SEND, new FormData(setupWindowChildren.FORM_WIZARD), hidePopupOnLoadData, window.utils.onErrormessage);
  });

})();
