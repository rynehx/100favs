var NotificationApiUtil = require('../util/notificationApiUtil');

var NotificationClientActions = {
  addNotification: NotificationApiUtil.addNotification,
  deleteNotification: NotificationApiUtil.deleteNotification
};

module.exports = NotificationClientActions;
