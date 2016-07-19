var Dispatcher = require('../dispatcher/dispatcher');
var GalleryConstants = require('../constants/galleryConstants');

var NotificationClientActions = require('../actions/notificationClientActions');

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
      _500px.api('/users/' + user.id + '/galleries/' + gallery.id + '/items','put', {add: {'after': { 'id': null }, 'photos': [ photo.id ]}},
      function (response) {
        if(response.data[(photo.id)+""].result === "added"){

          NotificationClientActions.addNotification({action: "add",item1: photo, item2: gallery});
          
        }
      });
    }
};


module.exports = GalleryApiUtils;
