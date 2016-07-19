//React
var React = require('react'),
    hashHistory = require('react-router').hashHistory;
//actions
var PhotosClientActions = require('../actions/PhotosClientActions');
var UserClientActions = require('../actions/UserClientActions');
var GalleryClientActions = require('../actions/galleryClientActions');
//stores
var PhotoStore = require('../stores/photosStore');
var UserStore = require('../stores/userStore');
var GalleryStore = require('../stores/galleryStore');
//components
var HomePage = require("./homePage");
//image sizes
var ImageSize = require('../util/imageSizes');
var imageSize = 20;

var imageHeight = parseInt(ImageSize[imageSize.toString()]);
var edge = 5; //this is the space between the pictures
var profilePictureSize= 40;
var fontHeight = 20;
var fadeHeight = 50;
var containerMinWidth = 300;
var containerWidth;

var getRatingWidth = function(rating){
  if(rating.toString().length>3){
    return 53;
  }else{
    return 43;
  }
};

var tabs = ['Popular', 'Upcoming', 'Fresh', 'Editors', 'Friends'];

var tabsToSearch = {
  'popular' : 'popular',
  'upcoming': 'upcoming',
  'fresh'   : 'fresh_today',
  'editors' : 'editors',
  'friends'  : 'user_friends'
};

var PhotoContent = React.createClass({

  getInitialState: function () {
    return { photos: [], galleries: [],user: undefined  };
  },

  componentWillMount: function(){
    _500px.getAuthorizationStatus(function (status) {
      if(status === "authorized"){
        UserClientActions.fetchCurrentUser();
      }
    });
  },

  componentDidMount: function(){
    // this is a listener to make the tabs follow the scroll of the user//
    var tabsBar = document.getElementById('photo-tabs-bar');
    document.addEventListener('scroll', function(){
      if((document.documentElement.scrollTop || document.body.scrollTop) > 150){
        tabsBar.style.top = "0px";
        tabsBar.style.position = "fixed";
        tabsBar.style.zIndex = 9001;
      }else if((document.documentElement.scrollTop || document.body.scrollTop) <= 150){
        tabsBar.style.top = "";
        tabsBar.style.position = "";
        tabsBar.style.zIndex = "";
      }
    });

    var category = tabsToSearch[(this.props.params.tabType ? this.props.params.tabType : "popular").toLowerCase()];
    if(category!=="user_friends"){
      PhotosClientActions.fetchPhotos(imageSize, category);
    }

    if(this.state.user){
      UserClientActions.fetchCurrentUser();
    }

    this.popularPhotosListener = PhotoStore.addListener(this._onPhotoChange);
    this.currentUserListener = UserStore.addListener(this._onUserChange);
    this.currentGalleryListener = GalleryStore.addListener(this._onGalleriesChange);

    window.addEventListener('resize',function(){
      this.forceUpdate();
    }.bind(this));
  },

  componentWillUnmount: function(){
    this.popularPhotosListener.remove();
    this.currentUserListener.remove();
    this.currentGalleryListener.remove();
  },

  _onUserChange: function(){
    var user = UserStore.fetchCurrentUser();

    var category = tabsToSearch[(this.props.params.tabType ? this.props.params.tabType : "popular").toLowerCase()];
    if(category==="user_friends"){
      PhotosClientActions.fetchFriendsPhotos(imageSize, category, user);
    }
    GalleryClientActions.fetchUserGalleries(user);
    this.setState({user: user});

  },

  _onPhotoChange: function(){
    this.setState({photos: PhotoStore.fetchPhotos()});
  },

  _onGalleriesChange: function(){
    this.setState({galleries: GalleryStore.fetchUserGalleries()});
  },




  componentWillReceiveProps: function(newprops){
    console.log(this.state.user)
    var category = tabsToSearch[(newprops.params.tabType ? newprops.params.tabType : "popular").toLowerCase()];

    if(category==="user_friends"){
      PhotosClientActions.fetchFriendsPhotos(imageSize, category, this.state.user);
    }else{
      PhotosClientActions.fetchPhotos(imageSize, category);
    }
  },

  render: function(){
    return (
      <div className = "photo-content">
        <div id = "photo-tabs-bar" className = "photo-tabs-bar">
          <ul className = "photo-content-tab-container">
            {tabs.map(function(tab,i){
              if(!this.props.params.tabType && i===0){
                return <li key = {i} className = "photo-content-tab photo-content-tab-selected">{tab}</li>;
              }else if(this.props.params.tabType === tab.toLowerCase()){
                return <li key = {i} className = "photo-content-tab photo-content-tab-selected">{tab}</li>;
              }else {
                return <li key = {i} className = "photo-content-tab" onClick = {function(){hashHistory.push('/'+tab.toLowerCase())}}>{tab}</li>;
              }

            }.bind(this))}
          </ul>
        </div>
        <HomePage user={this.state.user} photos = {this.state.photos} galleries = {this.state.galleries}/>
      </div>

    );
  }

});

module.exports = PhotoContent;
