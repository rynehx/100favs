var Dispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/userConstants');

module.exports = {
  fetchCurrentUser: function(){
    _500px.api('/users',{}, function (response) {
      console.log(response)
        Dispatcher.dispatch({
          actionType: UserConstants.fetchCurrentUser,
          items: response.data.user
          }
        );
    });
  }
};
