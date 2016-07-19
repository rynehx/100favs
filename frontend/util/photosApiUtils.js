var Dispatcher = require('../dispatcher/dispatcher');
var PhotoConstants = require('../constants/photoConstants');

module.exports = {
  fetchPhotos: function(size, feature){
    console.log(feature)
    _500px.api('/photos', { feature: feature, rpp: 100, image_size: size, sort: 'rating', include_states:1 }, function (response) {
    console.log(response)
        Dispatcher.dispatch({
          actionType: PhotoConstants.fetchPhotos,
          items: response.data.photos
          }
        );
    });
  },

  likePhoto: function(photo){//dont use refetch because it may fetch new photos, instead use re check or force update
    _500px.api('/photos/' + photo.id + '/vote',"post", {id: photo.id, vote:1}, function(response){
      if(response.success){
        photo.liked = true;
        Dispatcher.dispatch({
          actionType: PhotoConstants.updatePhoto,
          items: response.data.photos
        });
      }
    }.bind(this));
  },

  unlikePhoto: function(photo){
    _500px.api('/photos/' + photo.id + '/vote',"delete", {id: photo.id}, function(response){
      if(response.success){
        photo.liked = false;
        Dispatcher.dispatch({
          actionType: PhotoConstants.updatePhoto,
          items: response.data.photos
        });
      }
    }.bind(this));
  }

};
