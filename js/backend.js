// Выполняемые задачи: Модули загрузки и отправки данных

'use strict';

window.backend = (function () {

  return {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var url = 'https://js.dump.academy/code-and-magick/dat';

      xhr.responseType = 'json';
      console.log(onError);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError(xhr.status);
        }
      });

      xhr.open('GET', url);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError(xhr.status);
        }
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }

  };

})();
