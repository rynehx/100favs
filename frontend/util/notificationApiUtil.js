var Dispatcher = require('../dispatcher/dispatcher');
var NotificationConstants = require('../constants/notificationConstants');


module.exports = {
  addNotification: function(notification){
    Dispatcher.dispatch({
      actionType: NotificationConstants.addNotification,
      item: notification
      }
    );
  },
  deleteNotification: function(notification){
    Dispatcher.dispatch({
      actionType: NotificationConstants.deleteNotification,
      item: notification
      }
    );
  }
};
