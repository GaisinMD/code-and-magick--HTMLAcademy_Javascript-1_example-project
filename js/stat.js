// Зависимости: utils.js
// Выполняемые задачи: Отрисовка окна статистики после окончания игры
'use strict';

(function () {
  var CLOUD_POSITION_X = 100; // позиция окна результатов по Х
  var CLOUD_POSITION_Y = 10; // позиция окна результатов по Y
  var CLOUD_WIDTH = 420; // ширина окна результатов
  var CLOUD_HEIGHT = 270; // высота окна результатов
  var CLOUD_COLOR = 'rgba(255, 255, 255, 1)'; // цвет окна результатов
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)'; // цвет тени
  var CLOUD_SHADOW_SHIFT = 10; // величина смещения тени по Х и Y относительно окна результатов
  var FONT = 'PT Mono'; // шрифт
  var FONT_SIZE = '16px'; // размар шрифта
  var FONT_COLOR = 'rgba(0, 0, 0, 1)'; // цвет шрифта
  var GAP_TEXT_X = 70; // смещение текста по оси Х относительно внешнего края окна результатов
  var GAP_TEXT_Y = 10; //  смещение текста по оси Y относительно внешнего края окна результатов, также коэффицент вертикального смещения надписей относительно друг друга
  var GISTOGRAMM_HEIGHT = 150; // максимальная высота гистограммы
  var GISTOGRAMM_COLUMN_WIDTH = 40; // ширина колонки гистаграммы
  var GISTOGRAMM_COLUMNS_DISTANCE = 50; // смещение колонки по оси X относительно внешнего края окна результатов, также коэффицент горизонтального смещения колонок относительно друг друга
  var GISTOGRAMM_NAMES_POSITION_Y = 250; // позиция по оси Y подписей колонок, также якорь от которого идут расчеты в функции renderGistagrammColumn


  var renderCloud = function (ctx, positionX, positionY, width, height, colorFill) {
    ctx.fillStyle = colorFill;
    ctx.fillRect(positionX, positionY, width, height);
  };

  var renderText = function (ctx, text, positionX, positionY, font, fontSize, fontColor) {
    ctx.fillStyle = fontColor;
    ctx.font = font + ' ' + fontSize;
    ctx.textBaseline = 'hanging';
    ctx.fillText(text, positionX, positionY);
  };

  var renderGistagrammColumn = function (ctx, name, result, width, positionX, positionY, font, fontSize, fontColor) {
    var opacity = Math.round(Math.random() * 10) / 10; // случайное определение насыщенности цвета колонки
    var textGapX = 5; // смещение записи результат по оси X относительно колонки
    var textGapY = 22; // смещение записи результат по оси Y относительно колонки (над ней)
    var columnGapY = 5; // смещение колонки результат по оси Y относительно имени (над ним)
    ctx.fillStyle = fontColor;
    ctx.font = font + ' ' + fontSize;
    ctx.textBaseline = 'hanging';
    ctx.fillText(name, positionX, positionY);
    ctx.fillText(result, positionX + textGapX, positionY - result - textGapY);

    ctx.fillStyle = name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + opacity + ')';
    ctx.fillRect(positionX, positionY - result - columnGapY, width, result);
  };

  window.renderStatistics = function (ctx, names, times) {
    var maxResult = window.utils.getMaxElement(times);

    renderCloud(ctx, CLOUD_POSITION_X + CLOUD_SHADOW_SHIFT, CLOUD_POSITION_Y + CLOUD_SHADOW_SHIFT, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR); // тень облака
    renderCloud(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR); // облако
    renderText(ctx, 'Ура вы победили!', CLOUD_POSITION_X + GAP_TEXT_X, CLOUD_POSITION_Y + GAP_TEXT_Y, FONT, FONT_SIZE, FONT_COLOR); // Поздравление
    renderText(ctx, 'Список результатов:', CLOUD_POSITION_X + GAP_TEXT_X, CLOUD_POSITION_Y + 3 * GAP_TEXT_Y, FONT, FONT_SIZE, FONT_COLOR); // Заголовок статистики

    // цикл построения гистаграммы
    for (var i = 0; i < names.length; i++) {
      var playerResult = Math.round(times[i] * GISTOGRAMM_HEIGHT / maxResult);
      renderGistagrammColumn(ctx, names[i], playerResult, GISTOGRAMM_COLUMN_WIDTH, CLOUD_POSITION_X + GISTOGRAMM_COLUMNS_DISTANCE + GISTOGRAMM_COLUMNS_DISTANCE * (i * 2), GISTOGRAMM_NAMES_POSITION_Y, FONT, FONT_SIZE, FONT_COLOR); // рендер колонки с именем
    }
  };
})();
