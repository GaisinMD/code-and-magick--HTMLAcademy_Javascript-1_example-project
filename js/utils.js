// Выполняемые задачи: Создание утилитарных функций
'use strict';

window.utils = (function () {

  return {
    // нахождение максимального значения в массиве
    getMaxElement: function (arr) {
      var maxElement = 0;
      for (var i = 0; i < arr.length; i++) {
        maxElement = arr[i] > maxElement ? arr[i] : maxElement;
      }
      return Math.round(maxElement);
    },

    // перемещение окна
    moveWindow: function (evt, mainWindow, pointMove) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var isDragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        isDragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainWindow.style.top = (mainWindow.offsetTop - shift.y) + 'px';
        mainWindow.style.left = (mainWindow.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (isDragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            pointMove.removeEventListener('click', onClickPreventDefault);
          };
          pointMove.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

})();
