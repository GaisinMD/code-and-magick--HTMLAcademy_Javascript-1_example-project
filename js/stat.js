// Выполняемые задачи: Отрисовка окна статистики после окончания игры
// Зависимости: utils.js

'use strict';

(function () {
  var Cloud = {
    POSITION_X: 100, // позиция окна результатов по Х
    POSITION_Y: 10, // позиция окна результатов по Y
    WIDTH: 420, // ширина окна результатов
    HEIGHT: 270, // высота окна результатов
    COLOR: 'rgba(255, 255, 255, 1)', // цвет окна результатов
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)', // цвет тени
    SHADOW_SHIFT: 10 // величина смещения тени по Х и Y относительно окна результатов
  };

  var Font = {
    TYPE: 'PT Mono', // шрифт
    SIZE: '16px', // размар шрифта
    COLOR: 'rgba(0, 0, 0, 1)' // цвет шрифта
  };

  var Text = {
    GAP_X: 70, // смещение текста по оси Х относительно внешнего края окна результатов
    GAP_Y: 10 //  смещение текста по оси Y относительно внешнего края окна результатов, также коэффицент вертикального смещения надписей относительно друг друга
  };

  var Gistogramm = {
    HEIGHT: 150, // максимальная высота гистограммы
    COLUMN_WIDTH: 40, // ширина колонки гистаграммы
    COLUMNS_DISTANCE: 50, // смещение колонки по оси X относительно внешнего края окна результатов, также коэффицент горизонтального смещения колонок относительно друг друга
    NAMES_POSITION_Y: 250 // позиция по оси Y подписей колонок, также якорь от которого идут расчеты в функции renderGistagrammColumn
  };

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

    renderCloud(ctx, Cloud.POSITION_X + Cloud.SHADOW_SHIFT, Cloud.POSITION_Y + Cloud.SHADOW_SHIFT, Cloud.WIDTH, Cloud.HEIGHT, Cloud.SHADOW_COLOR); // тень облака
    renderCloud(ctx, Cloud.POSITION_X, Cloud.POSITION_Y, Cloud.WIDTH, Cloud.HEIGHT, Cloud.COLOR); // облако
    renderText(ctx, 'Ура вы победили!', Cloud.POSITION_X + Text.GAP_X, Cloud.POSITION_Y + Text.GAP_Y, Font.TYPE, Font.SIZE, Font.COLOR); // Поздравление
    renderText(ctx, 'Список результатов:', Cloud.POSITION_X + Text.GAP_X, Cloud.POSITION_Y + 3 * Text.GAP_Y, Font.TYPE, Font.SIZE, Font.COLOR); // Заголовок статистики

    // цикл построения гистаграммы
    for (var i = 0; i < names.length; i++) {
      var playerResult = Math.round(times[i] * Gistogramm.HEIGHT / maxResult);
      renderGistagrammColumn(ctx, names[i], playerResult, Gistogramm.COLUMN_WIDTH, Cloud.POSITION_X + Gistogramm.COLUMNS_DISTANCE + Gistogramm.COLUMNS_DISTANCE * (i * 2), Gistogramm.NAMES_POSITION_Y, Font.TYPE, Font.SIZE, Font.COLOR); // рендер колонки с именем
    }
  };
})();
