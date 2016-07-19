//react
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
var CollectionModal = require('../components/modals/collectionModal');

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

var currentUser;

var getRatingWidth = function(rating){
  if(rating.toString().length>3){
    return 53;
  }else{
    return 43;
  }
};





var HomePage = React.createClass({
  getInitialState: function () {
    return {loaded: false};
  },

  componentDidUpdate: function(){ //the photos container width shrinks after the photos loaded
    //this one time re-render sets the container to the original width;
    if(!this.state.loaded && this.props.photos.length>0){
      this.state.loaded = true;
      this.forceUpdate();
    }
  },

  handleNSFW : function(photo, position){
    if(photo.show && photo.nsfw){
      return <img className = "popular-image" draggable="false" style = {{ "top": edge, "left": edge,"height" : position[0]-edge*2,
          "width" : position[1]-edge*2}} src={photo.image_url} onClick = {function(){
              var win = window.open("https://500px.com/photo/" + photo.id, '_blank');
              win.focus();
          }.bind(this)}/>;
    }else if(photo.show){
      return <img className = "popular-image" draggable="false" style = {{ "top": edge, "left": edge,"height" : position[0]-edge*2,
          "width" : position[1]-edge*2}} src={photo.image_url} />;
    }else{

      return <div className = "popular-image nsfw-holder" draggable="false" style = {{ "top": edge, "left": edge,"height" : position[0]-edge*2,
          "width" : position[1]-edge*2, "fontSize": (position[1])/(10) }}  onClick = {function(){
              photo.show = true;
              this.forceUpdate();
          }.bind(this)}>

          <span>Adult Content</span>
          <span style = {{"height":position[0]/100}}></span>
          <span>Click to Show</span>

        </div>;
    }
  },

  handleFavorite: function(position, photo){
    if(this.props.user){
      var icon;
      if(photo.liked){//photo is liked, click is unlike action
        icon =  <i className="material-icons hred" onClick = {function(e){ e.stopPropagation();
            PhotosClientActions.unlikePhoto(photo);
          }}>favorite</i>;
      }else{//photo is not liked, click is like action
        icon =  <i className="material-icons hred" onClick = {function(e){ e.stopPropagation();
            PhotosClientActions.likePhoto(photo);}}>favorite_border</i>;
      }

      return <div className = "image-favorite" style={{ "left": (position[1])-(edge*2)-20-3,
        "top": (position[0]-edge)-(fontHeight/2)-(profilePictureSize/2)}}>
          {icon}
      </div>;
    }else{
      return <div></div>;
    }

  },

  handleCollection: function(position, photo){
    if(this.props.user){
      return <CollectionModal position = {position} edge = {edge} fontHeight = {fontHeight}
        user = {this.props.user} profilePictureSize = {profilePictureSize}
        photo = {photo} galleries = {this.props.galleries}/>;
    }else{
      return <div></div>;
    }

  },

  setPhotoPosition : function(){

    if(!document.getElementById("photo-container")){
      return [[0,0,0,0]];
    }


    var position =[];  //[height, width, top, left]

    var container = document.getElementById("photo-container").getBoundingClientRect();
    containerWidth = container.width;
    var length = this.props.photos.length;
    var photos = this.props.photos;
    var i = 0;
    var row = [];
    var rowWidth = 0;
    var corner = 0;
    var nextcorner= 0;
    var photo;
    while(i < length){
      photo = photos[i];
      photo.newWidth = (photo.width*(imageHeight/photo.height));

          if(rowWidth+photo.newWidth > container.width ){

            rowWidth+=photo.newWidth;
            row.push(photo);
            var scale = container.width/(rowWidth);

            row.forEach(function(rowPhoto){
              var photoWidth = (rowPhoto.width*(imageHeight/rowPhoto.height));
              position.push([imageHeight*scale, photoWidth*scale, corner, nextcorner]);
              nextcorner+=photoWidth*scale;

            });
            corner+=imageHeight*scale;
            row = [];
            rowWidth = 0;
            nextcorner = 0;
          }else{
            rowWidth+=photo.newWidth;
            row.push(photo);
          }
      i++;
    }

    row.forEach(function(rowPhoto){ // the last photo is appended
      var photoWidth = (rowPhoto.width*(imageHeight/rowPhoto.height));
      position.push([imageHeight, photoWidth, corner, nextcorner]);
      nextcorner+=photoWidth;
    });

    position.push(corner+imageHeight);

    return position;
  },


  render: function(){
    var position = this.setPhotoPosition(); // get all the position of the photo to display

    return (
      <div className="home-page">
        <div className = "popular-photos-list" id = "photo-container" style = {{"height": position[position.length-1],   "minWidth": 300 }}>
          {
            this.props.photos.map(function(photo,i){
              return <div className = "popular-image-container" style = {{ "top": position[i][2], "left": position[i][3], "height" : position[i][0],
                "width" : position[i][1]}} key = {photo.id}>

                <div className = "image-wrapper" onClick={function(){
                    if(!photo.nsfw){
                      var win = window.open("https://500px.com/photo/" + photo.id, '_blank');
                      win.focus();}}}

                  style = {{"height" : position[i][0],
                    "width" : position[i][1]}}>

                  <div className = "image-overlay" style = {{ "top": 0, "left": edge,"height" : position[i][0],
                    "width" : position[i][1]-edge*2}} />

                  {this.handleNSFW(photo, position[i])}
                  <div className = "image-top-fade" on style={{ "top": edge, "left": edge,"height" : fadeHeight,
                    "width" : position[i][1]-edge*2}} />
                  <div className = "image-bot-fade" style={{ "top": position[i][0]-edge-fadeHeight, "left": edge,"height" : fadeHeight,
                    "width" : position[i][1]-edge*2}} />

                  <img className = "author-photo" onClick={function(e){
                      e.stopPropagation();
                      var win = window.open("https://500px.com/" + photo.user.username, '_blank'); win.focus();}}
                      style={{ "top": position[i][0]-edge-profilePictureSize, "left": edge+edge,
                        "height": profilePictureSize, "width": profilePictureSize}} src={photo.user.userpic_url}/>

                  <div className = "author-username" onClick={function(e){
                        e.stopPropagation();
                  var win = window.open("https://500px.com/" + photo.user.username, '_blank'); win.focus();}}
                  style={{ "top": (position[i][0]-edge)-(fontHeight/2)-(profilePictureSize/2), "left": edge+profilePictureSize+2*edge, "height": fontHeight}}>{photo.user.username}</div>

                  <div className = "image-views" style={{ "left": edge+edge, "top": edge}}>
                    <i className="material-icons md-light space-right">&#xE417;</i>
                    {photo.times_viewed}
                  </div>
                    {this.handleFavorite(position[i], photo)}
                    {this.handleCollection(position[i], photo)}
                  <div className = "image-rating" style={{ "left": (position[i][1])-(edge*2)-getRatingWidth(photo.rating)-3, "top": edge, "width": getRatingWidth(photo.rating) }}>
                    <i className="material-icons md-light space-right">&#xE885;</i>
                    {photo.rating}
                  </div>
                </div>
              </div>;
            }.bind(this))
          }
        </div>


      </div>
    );
  }
});

module.exports = HomePage;
