var PhotoApiUtils = require('../util/photosApiUtils');

var PhotosClientActions = {
  fetchPhotos: PhotoApiUtils.fetchPhotos,
  likePhoto: PhotoApiUtils.likePhoto,
  unlikePhoto: PhotoApiUtils.unlikePhoto
};

module.exports = PhotosClientActions;
