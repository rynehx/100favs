var PhotoApiUtils = require('../util/photosApiUtils');

var PhotosClientActions = {
  fetchPopularPhotos: PhotoApiUtils.fetchPopularPhotos,
  likePhoto: PhotoApiUtils.likePhoto,
  unlikePhoto: PhotoApiUtils.unlikePhoto
};

module.exports = PhotosClientActions;
