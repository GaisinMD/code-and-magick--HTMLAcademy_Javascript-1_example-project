// Выполняемые задачи: Изменение внешнего вида волшебника
'use strict';

window.wizardChange = (function () {
  var wizard = {
    onColorChange: window.delay.debounce(function (colorCoat, colorEyes) {
      var sortedWizards = window.sortModule.sortWizards(window.sortModule.wizards, colorCoat, colorEyes);
      window.generate.generateWizards(sortedWizards);
    })
  };

  return {
    wizard: wizard,

    changeColors: function (areaParrent, imageClass, inputName, colorsList, styleChange) {
      var area = areaParrent.querySelector(imageClass);
      var input = document.getElementsByName(inputName);
      var color = colorsList[Math.floor(Math.random() * (colorsList.length))];
      area.style = styleChange + color;
      input[0].value = color;
      return color;
    }

  };

})();
