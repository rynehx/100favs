var AppDispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store;

var UserConstants = require('../constants/userConstants');

var UserStore = new Store(AppDispatcher);

var currentUser;


UserStore.recieveCurrentUser = function(user){
  currentUser = user;
  this.__emitChange();
};

UserStore.recieveUserGalleries = function(data){
  console.log(data);
  galleries = data;
  this.__emitChange();
};

UserStore.fetchCurrentUser = function(){
  return currentUser;
};

UserStore.fetchUserGalleries = function(){
  return galleries;
};



UserStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case UserConstants.fetchCurrentUser:
    UserStore.recieveCurrentUser(payload.items);
    break;
  }
};

module.exports = UserStore;
