// Выполняемые задачи: Создание утилитарных функций
// Зависимости:

'use strict';

window.utils = (function () {
  var Rect = function (left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  };

  var Coordinate = function (x, y, constraints) {
    this.x = x;
    this.y = y;
    this._constraints = constraints;
  };

  Coordinate.prototype.setX = function (x) {
    if (x >= this._constraints.left &&
      x <= this._constraints.right) {
      this.x = x;
    }
  };

  Coordinate.prototype.setY = function (y) {
    if (y >= this._constraints.top &&
      y <= this._constraints.bottom) {
      this.y = y;
    }
  };

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
      var SHIFT_Y = 40;
      var SHIFT_X = 364;

      evt.preventDefault();

      var startCoords = new Coordinate(evt.clientX, evt.clientY, new Rect(0, 0, 1200, 800));

      var isDragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        isDragged = true;

        startCoords.setY(moveEvt.clientY);
        mainWindow.style.top = startCoords.y - SHIFT_Y + 'px';

        startCoords.setX(moveEvt.clientX);
        mainWindow.style.left = startCoords.x + SHIFT_X + 'px';
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
