// Выполняемые задачи: Создание задержки в отрисовке списка магов
'use strict';

window.delay = (function () {

  return {

    // установка задержки
    debounce: function (callback) {
      var DEBOUNCE_INTERVAL = 300;
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          callback.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };

    }

  };

})();
