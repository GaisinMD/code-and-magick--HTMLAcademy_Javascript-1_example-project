// Выполняемые задачи: Модулm сортировки списка волшебников

'use strict';

window.sortModule = (function () {

  var getRank = function (wizard, coatColor, eyesColor) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  return {

    sortWizards: function (wizardsList, coatColor, eyesColor) {

      return wizardsList.slice()
        .sort(function (left, right) {
          var rankDiff = getRank(right, coatColor, eyesColor) - getRank(left, coatColor, eyesColor);
          if (rankDiff === 0) {
            rankDiff = wizardsList.indexOf(left) - wizardsList.indexOf(right);
          }
          return rankDiff;
        });

    }

  };

})();
