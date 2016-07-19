//react
var React = require('react');
//actions
var NotificationClientActions = require('../actions/notificationClientActions');
//stores
var NotificationStore = require('../stores/notificationStore');

var NotificationPanel = React.createClass({
  getInitialState: function(){
    return {notifications : []};
  },


  componentDidMount: function(){

    this.notificationListener = NotificationStore.addListener(this._onChange);


    // var timeoutID;
    // function delayedAlert() {
    //   timeoutID = window.setTimeout(slowAlert, 2000);
    // }
    //
    // function slowAlert() {
    //   alert("That was really slow!");
    // }
    //
    // delayedAlert();

  },


  _handleNotification: function(n){
    if(n.action === "add"){
      return <li key = {n.id} className = "notification-list-item">
        <div className = "notification-list-image-wrapper">
          <img className = "notification-list-photo-image" src={n.item1.image_url}/>
        </div>

        <div className = "notification-list-action" >added to</div>

        <div className = "notification-list-image-wrapper">
          <img className = "notification-list-gallery-image" src={n.item2.cover_photo[0].url}/>
        </div>

        <div className = "notification-list-gallery-name">{n.item2.name}</div>
      </li>;
    }else{

    }
  },


  _onChange: function(){
    var old = this.state.notifications;
    this.setState({notifications: NotificationStore.fetchNotifications()});
  },

  render: function(){
    return (
      <div className = "notification-panel">
        <ul className = "notification-list">
          {this.state.notifications.map(function(n,i){
            return this._handleNotification();
          }.bind(this))}
        </ul>
      </div>
    );
  }


});

module.exports = NotificationPanel;
