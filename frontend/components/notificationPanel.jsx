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
  },


  _handleNotification: function(n){//display the like and add to gallery notification for the respective action
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
    }else if(n.action === "liked" || n.action === "unliked"){
      return <li key = {n.id} className = "notification-list-item">
        <div className = "notification-list-image-wrapper">
          <img className = "notification-list-photo-image" src={n.item1.image_url}/>
        </div>
        <div className = "notification-list-action" >{n.action}</div>
      </li>;
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
          {this.state.notifications.map(function(n){
            return this._handleNotification(n);
          }.bind(this))}
        </ul>
      </div>
    );
  }


});

module.exports = NotificationPanel;
