//React
var React = require('react');
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




var PhotoContent = React.createClass({

  getInitialState: function () {
    return { photos: [], galleries: [] };
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

    PhotosClientActions.fetchPhotos(imageSize, (this.props.params.tabType ? this.props.params.tabType : "popular").toLowerCase());
    this.popularPhotosListener = PhotoStore.addListener(this._onPhotoChange);
    this.currentUserListener = UserStore.addListener(this._onUserChange);
    this.currentGalleryListener = GalleryStore.addListener(this._onGalleriesChange);
    UserClientActions.fetchCurrentUser();
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
    PhotosClientActions.fetchPhotos(imageSize, (newprops.params.tabType ? newprops.params.tabType : "popular").toLowerCase());  
  },

  render: function(){
    return (
      <div className = "photo-content">
        <div id = "photo-tabs-bar" className = "photo-tabs-bar">
        </div>
        <HomePage photos = {this.state.photos} galleries = {this.state.galleries}/>
      </div>

    );
  }

});

module.exports = PhotoContent;
