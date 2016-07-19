var NotificationClientActions = require('../actions/notificationClientActions');

var Notificaton = function(id, obj){
  this.id = id;
  this.item1 = obj.item1;
  this.item2 = obj.item2;
  this.action = obj.action;
};

Notificaton.prototype.startTimer = function(){
  window.setTimeout(this.deleteNotification(this), 1000);
};


Notificaton.prototype.deleteNotification = function(notification){
  NotificationClientActions.deleteNotification(notification);
};


module.exports = Notificaton;
