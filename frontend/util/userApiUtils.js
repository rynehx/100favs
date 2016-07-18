var Dispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/userConstants');

module.exports = {
  fetchCurrentUser: function(callback){
    _500px.api('/users',{}, function (response) {
        Dispatcher.dispatch({
          actionType: UserConstants.fetchCurrentUser,
          items: response.data.user
          }
        );
        callback();
    });
  },

  fetchUserGalleries: function(user){
    _500px.api('users/' + user.id + '/galleries',{rpp: 100, sort: 'last_added_to_at', include_cover: 1}, function (response) {
        Dispatcher.dispatch({
          actionType: UserConstants.fetchUserGalleries,
          items: response.data.galleries
          }
        );
    });
  }
};
