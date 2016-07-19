var Dispatcher = require('../dispatcher/dispatcher');
var GalleryConstants = require('../constants/galleryConstants');

var GalleryApiUtils = {
  fetchUserGalleries: function(user){
      _500px.api('/users/' + user.id + '/galleries',{rpp: 100, sort: 'last_added_to_at', include_cover: 1}, function (response) {
          Dispatcher.dispatch({
            actionType: GalleryConstants.fetchUserGalleries,
            items: response.data.galleries
            }
          );
      });
    },

    postToGallery: function(user, gallery, photo){
      console.log('/users/' + user.id + '/galleries/' + gallery.id + '/items');
      _500px.api('/users/' + user.id + '/galleries/' + gallery.id + '/items', {add: {"after": { "id": null }, "photos": [ photo.id ]},},
      function (response) {

        console.log(response)
          // Dispatcher.dispatch({
          //   actionType: GalleryConstants.fetchUserGalleries,
          //   items: response.data.galleries
          //   }
          // );
      });
    }
};


module.exports = GalleryApiUtils;
