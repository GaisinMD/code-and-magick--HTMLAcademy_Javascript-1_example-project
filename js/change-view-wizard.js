// Выполняемые задачи: Изменение внешнего вида волшебника
'use strict';

window.wizard = (function () {

  return {

    changeColors: function (areaParrent, imageClass, inputName, colorsList, styleChange) {
      var area = areaParrent.querySelector(imageClass);
      var input = document.getElementsByName(inputName);
      var color = colorsList[Math.floor(Math.random() * (colorsList.length))];
      area.style = styleChange + color;
      input[0].value = color;
    }
  };
})();
