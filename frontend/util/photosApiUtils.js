var Dispatcher = require('../dispatcher/dispatcher');
var PhotoConstants = require('../constants/photoConstants');

module.exports = {
  fetchPopularPhotos: function(size){
    _500px.api('/photos', { feature: 'popular', rpp: 100, image_size: size, sort: 'rating', include_states:1 }, function (response) {
        Dispatcher.dispatch({
          actionType: PhotoConstants.fetchPopularPhotos,
          items: response.data.photos
          }
        );
    });
  },

  likePhoto: function(photo, imageSize){
    _500px.api('/photos/' + photo.id + '/vote',"post", {id: photo.id, vote:1}, function(res){
      if(res.success){
        this.fetchPopularPhotos(imageSize);
      }
    }.bind(this));
  },

  unlikePhoto: function(photo, imageSize){
    _500px.api('/photos/' + photo.id + '/vote',"delete", {id: photo.id}, function(res){
      console.log(res)
      if(res.success){
        console.log(res)
        this.fetchPopularPhotos(imageSize);
      }
    }.bind(this));
  }

};
