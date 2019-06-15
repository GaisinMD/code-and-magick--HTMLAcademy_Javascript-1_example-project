'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARDS_QUANTITY = 4;

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
var setupOpenButton = document.querySelector('.setup-open');
var setupWindow = document.querySelector('.setup');
var setupCloseButton = setupWindow.querySelector('.setup-close');
var userNameInput = setupWindow.querySelector('.setup-user-name');
var wizard = setupWindow.querySelector('.wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var fireball = setupWindow.querySelector('.setup-fireball-wrap');

var wizardFirstNamesList = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardLastNamesList = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColorsList = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColorsList = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardFireballColorsList = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizardsList = [];

var generateViews = function (firstNamesList, lastNamesList, coatColorsList, eyesColorsList, count) {
  var charsList = [];
  for (var i = 0; i < count; i++) {
    var view = {};
    view.name = firstNamesList[Math.floor(Math.random() * (firstNamesList.length))] + ' ' + lastNamesList[Math.floor(Math.random() * (lastNamesList.length))];
    view.coatColor = coatColorsList[Math.floor(Math.random() * (coatColorsList.length))];
    view.eyesColor = eyesColorsList[Math.floor(Math.random() * (eyesColorsList.length))];
    charsList.push(view);
  }
  return charsList;
};

var generateTemplate = function (template, item) {
  var templateElement = template.cloneNode(true);
  templateElement.querySelector('.setup-similar-label').textContent = item.name;
  templateElement.querySelector('.wizard-coat').style.fill = item.coatColor;
  templateElement.querySelector('.wizard-eyes').style.fill = item.eyesColor;
  return templateElement;
};

var generateWizards = function (list, parentElement) {
  if (!parentElement.children[0]) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < list.length; i++) {
      fragment.appendChild(generateTemplate(similarWizardTemplate, list[i]));
    }
    parentElement.appendChild(fragment);
  }
};

var showElement = function (element) {
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  }
};

var showPopUp = function (element) {
  showElement(element);
  document.addEventListener('keydown', onPopupEscPress, true);
};

var hidePopup = function (element) {
  if (!element.classList.contains('hidden')) {
    element.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress, true);
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && (document.activeElement !== userNameInput)) {
    hidePopup(setupWindow);
  }
};

var setupShowWizards = function () {
  wizardsList = generateViews(wizardFirstNamesList, wizardLastNamesList, wizardCoatColorsList, wizardEyesColorsList, WIZARDS_QUANTITY);
  generateWizards(wizardsList, setupSimilarList);
  showElement(setupSimilar);
};

var changeColors = function (area, colorsList) {
  var color = colorsList[Math.floor(Math.random() * (colorsList.length))];
  area.style = 'fill: ' + color;
};

var changeFireballColors = function (area, colorsList) {
  var color = colorsList[Math.floor(Math.random() * (colorsList.length))];
  area.style = 'background-color: ' + color;
  area.children[1].value = color;
};

setupOpenButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  showPopUp(setupWindow);
  setupShowWizards();
});

setupOpenButton.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.keyCode === ENTER_KEYCODE) {
    showPopUp(setupWindow);
    setupShowWizards();
  }
});

setupCloseButton.addEventListener('click', function () {
  hidePopup(setupWindow);
});

setupCloseButton.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.keyCode === ENTER_KEYCODE) {
    hidePopup(setupWindow);
  }
});

wizardCoat.addEventListener('click', function () {
  changeColors(wizardCoat, wizardCoatColorsList);
});

wizardEyes.addEventListener('click', function () {
  changeColors(wizardEyes, wizardEyesColorsList);
});

fireball.addEventListener('click', function () {
  changeFireballColors(fireball, wizardFireballColorsList);
});
