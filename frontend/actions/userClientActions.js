var UserApiUtils = require('../util/userApiUtils');

var UserClientActions = {
  fetchCurrentUser: UserApiUtils.fetchCurrentUser,
  fetchUserGalleries: UserApiUtils.fetchUserGalleries
};

module.exports = UserClientActions;
