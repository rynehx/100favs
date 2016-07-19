var Dispatcher = require('../dispatcher/dispatcher');
var NotificationConstants = require('../constants/notificationConstants');


module.exports = {
  addNotification: function(notification){
    Dispatcher.dispatch({
      actionType: NotificationConstants.addNotification,
      items: notification
      }
    );
  },
  deleteNotification: function(notification){
    Dispatcher.dispatch({
      actionType: NotificationConstants.deleteNotification,
      items: notification
      }
    );
  }
};
