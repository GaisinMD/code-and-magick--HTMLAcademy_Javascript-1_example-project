// Выполняемые задачи: Генерация списка волшебников, изменение внешнего вида волшебника
// Зависимости:

'use strict';

window.generate = (function () {
  var WIZARDS_QUANTITY = 4;

  var setupSimilarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var generateTemplate = function (template, item) {
    var templateElement = template.cloneNode(true);
    templateElement.querySelector('.setup-similar-label').textContent = item.name;
    templateElement.querySelector('.wizard-coat').style.fill = item.colorCoat;
    templateElement.querySelector('.wizard-eyes').style.fill = item.colorEyes;
    return templateElement;
  };

  return {

    generateWizards: function (list) {
      var parentElement = setupSimilarList;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < WIZARDS_QUANTITY; i++) {
        fragment.appendChild(generateTemplate(similarWizardTemplate, list[i]));
      }
      while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
      }
      parentElement.appendChild(fragment);
    }

  };

})();
