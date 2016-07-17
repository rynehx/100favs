var Dispatcher = require('../dispatcher/dispatcher');
var PhotoConstants = require('../constants/photoConstants');

module.exports = {
  fetchPopularPhotos: function(size){

    _500px.api('/photos', { feature: 'popular', rpp: 100, image_size: size, sort: 'rating' }, function (response) {
        Dispatcher.dispatch({
          actionType: PhotoConstants.fetchPopularPhotos,
          items: response.data.photos
          }
        );
    });



  }


};
