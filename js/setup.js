// Зависимости: utils.js, list-wizards.js, change-view-wizard.js, backend.js, sorting-wizards.js;
// Выполняемые задачи: Создание окна персонажа (setup) и работа с ним

'use strict';

(function () {
  var SetupStartCoord = {
    X: '932px',
    Y: '80px'
  };

  var Url = {
    GET: 'https://js.dump.academy/code-and-magick/data',
    SEND: 'https://js.dump.academy/code-and-magick'
  };

  var setupSimilar = document.querySelector('.setup-similar');

  var setupOpenButton = document.querySelector('.setup-open');

  var setupWindow = document.querySelector('.setup');

  var SetupWindowChildren = {
    FORM_WIZARD: setupWindow.querySelector('.setup-wizard-form'),
    DIALOG_HANDLER: setupWindow.querySelector('.upload'),
    SETUP_CLOSE_BUTTON: setupWindow.querySelector('.setup-close'),
    USER_NAME_INPUT: setupWindow.querySelector('.setup-user-name')
  };

  var Wizard = {
    COAT: setupWindow.querySelector('.wizard-coat'),
    COAT_CLASS: '.wizard-coat',
    COAT_INPUT_NAME: 'coat-color',
    EYES: setupWindow.querySelector('.wizard-eyes'),
    EYES_CLASS: '.wizard-eyes',
    EYES_INPUT_NAME: 'eyes-color',
    FIREBALL: setupWindow.querySelector('.setup-fireball-wrap'),
    FIREBALL_CLASS: '.setup-fireball-wrap',
    FIREBALL_INPUT_NAME: 'fireball-color',

    COAT_COLOR: 'rgb(101, 137, 164)',
    COAT_COLORS_LIST: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLOR: 'black',
    EYES_COLORS_LIST: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS_LIST: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var wizardVariableStyleChange = 'fill: ';
  var fireballVariableStyleChange = 'background-color: ';

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
    if (evt.keyCode === window.utils.ESC_KEYCODE && evt.target !== SetupWindowChildren.USER_NAME_INPUT) {
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
    window.backend.load(Url.GET, window.generate.generateWizards, window.utils.onErrormessage);
    showElement(setupSimilar);
  });

  setupOpenButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      showPopUp(setupWindow);
      window.backend.load(Url.GET, window.generate.generateWizards, window.utils.onErrormessage);
      showElement(setupSimilar);
    }
  });

  SetupWindowChildren.SETUP_CLOSE_BUTTON.addEventListener('click', function () {
    hidePopup(setupWindow);
  });

  SetupWindowChildren.SETUP_CLOSE_BUTTON.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      hidePopup(setupWindow);
    }
  });

  Wizard.COAT.addEventListener('click', function () {
    Wizard.COAT_COLOR = window.wizardChange.changeColors(setupWindow, Wizard.COAT_CLASS, Wizard.COAT_INPUT_NAME, Wizard.COAT_COLORS_LIST, wizardVariableStyleChange);
    window.generate.generateWizards(window.sortModule.sortWizards(window.sortModule.wizards, Wizard.COAT_COLOR, Wizard.EYES_COLOR));
  });

  Wizard.EYES.addEventListener('click', function () {
    Wizard.EYES_COLOR = window.wizardChange.changeColors(setupWindow, Wizard.EYES_CLASS, Wizard.EYES_INPUT_NAME, Wizard.EYES_COLORS_LIST, wizardVariableStyleChange);
    window.generate.generateWizards(window.sortModule.sortWizards(window.sortModule.wizards, Wizard.COAT_COLOR, Wizard.EYES_COLOR));
  });

  Wizard.FIREBALL.addEventListener('click', function () {
    window.wizardChange.changeColors(setupWindow, Wizard.FIREBALL_CLASS, Wizard.FIREBALL_INPUT_NAME, Wizard.FIREBALL_COLORS_LIST, fireballVariableStyleChange);
  });

  SetupWindowChildren.DIALOG_HANDLER.addEventListener('mousedown', function (evt) {
    window.utils.moveWindow(evt, setupWindow, SetupWindowChildren.DIALOG_HANDLER);
  });

  SetupWindowChildren.FORM_WIZARD.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(Url.SEND, new FormData(SetupWindowChildren.FORM_WIZARD), hidePopupOnLoadData, window.utils.onErrormessage);
  });

})();
