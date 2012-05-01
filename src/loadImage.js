define(function() {

  function loadImage(file, cb) {

    var img = document.createElement("img")
      , url
      , oUrl;

    img.onerror = cb;
    img.onload = function() {
      oUrl && revokeObjectURL(oUrl);
      cb(img);
    };
    if (window.File && file instanceof File) {
      url = oUrl = createObjectURL(file);
    } else {
      url = file;
    }
    if (url) {
      img.src = url;
      return img;
    } else {
      return readFile(file, function(url) {
        img.src = url;
      });
    }
  }

  var urlApi = window.createObjectURL && window || window.URL || window.webkitURL;

  function createObjectURL(file) {
    return urlApi ? urlApi.createObjectURL(file) : false;
  }

  function revokeObjectURL(url) {
    return urlApi ? urlApi.revokeObjectURL(url) : false;
  }

  function readFile(file, callback) {
    if (window.FileReader && FileReader.prototype.readAsDataURL) {
      var fileReader = new FileReader();

      fileReader.onload = function (e) {
        callback(e.target.result);
      };

      fileReader.readAsDataURL(file);

      return fileReader;
    }

    return false;
  }


  return loadImage;
});