var AppDispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store;

//constants
var NotificationConstants = require('../constants/notificationConstants');
//notification class
var Notificaton = require('../util/notification');

var NotificationStore = new Store(AppDispatcher);
var notificationIdx = 0;
var notifications = [];





NotificationStore.addNotification = function(item){
//photo url, photo name  "added to " gallery url gallery name;
  var newNotification = new Notificaton(notificationIdx, item);
  notificationIdx+=1;

  // window.setTimeout(function(){
  //   newNotification.startTimer();
  // }, 5000);
  notifications.push(newNotification);
  this.__emitChange();
};


NotificationStore.deleteNotification = function(item){
  var deleteIdx = notifications.findIndex(function(notification){
    return notification.id === item.id;
  });
  notifications.splice(deleteIdx,1);
  this.__emitChange();
};

NotificationStore.fetchNotifications = function(){
  return notifications;
};


NotificationStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case NotificationConstants.addNotification:
    NotificationStore.addNotification(payload.item);
    break;
    case NotificationConstants.deleteNotification:
    NotificationStore.deleteNotification(payload.item);
    break;
  }
};


module.exports = NotificationStore;
