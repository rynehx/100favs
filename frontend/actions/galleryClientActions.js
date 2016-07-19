var GalleryApiUtils = require('../util/galleryApiUtils');

var GalleryClientActions = {
  fetchUserGalleries: GalleryApiUtils.fetchUserGalleries,
  postToGallery: GalleryApiUtils.postToGallery
};

module.exports = GalleryClientActions;
