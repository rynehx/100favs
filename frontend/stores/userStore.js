var AppDispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store;

var UserConstants = require('../constants/userConstants');

var UserStore = new Store(AppDispatcher);

var currentUser;

UserStore.recieveCurrentUser = function(user){
  console.log(user)
  currentUser = user;
  this.__emitChange();
};


UserStore.fetchCurrentUser = function(){
  return currentUser;
};



UserStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case UserConstants.fetchCurrentUser:
    UserStore.recieveCurrentUser(payload.items);
    break;
  }
};

module.exports = UserStore;
