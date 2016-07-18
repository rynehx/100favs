var AppDispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store;

var PhotoConstants = require('../constants/photoConstants');
var PhotoStore = new Store(AppDispatcher);

var popular =[];

PhotoStore.recievePopularPhotos = function(items){
  items.forEach(function(photo){
    if(photo.nsfw){
        photo.show=false;
    }else{
        photo.show=true;
    }
  });
  popular = items; 
  this.__emitChange();
};


PhotoStore.fetchPopularPhotos = function(){
  return popular;
};


PhotoStore.__onDispatch = function(payload){

  switch(payload.actionType){
    case PhotoConstants.fetchPopularPhotos:
    PhotoStore.recievePopularPhotos(payload.items);
    break;
  }
};


module.exports = PhotoStore;
