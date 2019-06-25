// Выполняемые задачи: Генерация списка волшебников, изменение внешнего вида волшебника
// Зависимости:

'use strict';

window.generate = (function () {
  var WIZARDS_QUANTITY = 4;

  var setupSimilarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var getWizards = function (list) {
    var count = WIZARDS_QUANTITY;
    var charsList = [];
    for (var i = 0; i < count; i++) {
      var view = {};
      view.name = list[i].name;
      view.coatColor = list[i].colorCoat;
      view.eyesColor = list[i].colorEyes;
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

  return {

    generateWizards: function (list) {
      var parentElement = setupSimilarList;
      var wizardsList = getWizards(list);
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < wizardsList.length; i++) {
        fragment.appendChild(generateTemplate(similarWizardTemplate, wizardsList[i]));
      }
      while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
      }
      parentElement.appendChild(fragment);
    }

  };

})();
