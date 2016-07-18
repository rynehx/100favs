var AppDispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store;

var GalleryConstants = require('../constants/galleryConstants');

var GalleryStore = new Store(AppDispatcher);


var galleries = [];


GalleryStore.recieveUserGalleries = function(data){
  galleries = data;
  this.__emitChange();
};

GalleryStore.fetchUserGalleries = function(){
  return galleries;
};


GalleryStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case GalleryConstants.fetchUserGalleries:
    GalleryStore.recieveUserGalleries(payload.items);
    break;
  }
};

module.exports = GalleryStore;
