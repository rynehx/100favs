var PhotoApiUtils = require('../util/photosApiUtils');

var PhotosClientActions = {
  fetchPhotos: PhotoApiUtils.fetchPhotos,
  likePhoto: PhotoApiUtils.likePhoto,
  unlikePhoto: PhotoApiUtils.unlikePhoto,
  fetchFriendsPhotos: PhotoApiUtils.fetchFriendsPhotos
};

module.exports = PhotosClientActions;
