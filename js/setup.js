'use strict';

var similarWizardTemplate = document.querySelector('#similar-wizard-template ').content.querySelector('.setup-similar-item');
var setupSimilarList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

var WIZARDS_QUANTITY = 4;
var wizardFirstNamesList = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardLastNamesList = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColorsList = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColorsList = ['black', 'red', 'blue', 'yellow', 'green'];
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

document.querySelector('.setup').classList.remove('hidden');

wizardsList = generateViews(wizardFirstNamesList, wizardLastNamesList, wizardCoatColorsList, wizardEyesColorsList, WIZARDS_QUANTITY);

for (var i = 0; i < wizardsList.length; i++) {
  fragment.appendChild(generateTemplate(similarWizardTemplate, wizardsList[i]));
}

setupSimilarList.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
