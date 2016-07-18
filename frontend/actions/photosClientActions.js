var PhotoApiUtils = require('../util/photosApiUtils');
var UserApiUtils = require('../util/userApiUtils');

var PhotosClientActions = {
  fetchPopularPhotos: PhotoApiUtils.fetchPopularPhotos,
  fetchCurrentUser: UserApiUtils.fetchCurrentUser
};

module.exports = PhotosClientActions;
