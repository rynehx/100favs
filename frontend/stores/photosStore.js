var AppDispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store;

var PhotoConstants = require('../constants/photoConstants');
var PhotoStore = new Store(AppDispatcher);

var photos =[];

PhotoStore.recievePhotos = function(items){
  items.forEach(function(photo){
    if(photo.nsfw){
        photo.show=false;
    }else{
        photo.show=true;
    }
  });
  photos = items;
  this.__emitChange();
};


PhotoStore.fetchPhotos = function(){
  return photos;
};

PhotoStore.recieveUpdatedPhoto = function(){
  this.__emitChange();
};


PhotoStore.__onDispatch = function(payload){

  switch(payload.actionType){
    case PhotoConstants.fetchPhotos:
    PhotoStore.recievePhotos(payload.items);
    break;
    case PhotoConstants.updatePhoto:
    PhotoStore.recieveUpdatedPhoto(payload.items);
  }
};


module.exports = PhotoStore;
