// Выполняемые задачи: Создание утилитарных функций
// Зависимости:

'use strict';

window.utils = (function () {

  return {
    // константа
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

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
    },

    // popup ошибки
    onErrormessage: function (code) {
      var popup = document.querySelector('.error-message');
      var errorCode = popup.querySelector('.error-message-code');
      var button = popup.querySelector('.error-message-button');

      var hidePopup = function (element) {
        if (!element.classList.contains('hidden')) {
          element.classList.add('hidden');
          document.removeEventListener('keydown', onEscPress);
        }
      };

      var onEscPress = function (evt) {
        if (evt.keyCode === window.utils.ESC_KEYCODE) {
          hidePopup(popup);
        }
      };

      button.addEventListener('click', function () {
        hidePopup(popup);
      });

      if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
        document.addEventListener('keydown', onEscPress);
      }

      errorCode.textContent = code;
    }

  };

})();
