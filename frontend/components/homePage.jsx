//react
var React = require('react');
//actions
var PhotosClientActions = require('../actions/PhotosClientActions');
//stores
var PhotoStore = require('../stores/photosStore');

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





var HomePage = React.createClass({
  getInitialState: function () {
    return { photos: [] };
  },

  componentDidMount: function(){
    PhotosClientActions.fetchPopularPhotos(imageSize);
    this.popularPhotosListener = PhotoStore.addListener(this._onChange);
    window.addEventListener('resize',function(){
      this.forceUpdate();
    }.bind(this));
  },

  componentWillUnmount: function(){
    this.popularPhotosListener.remove();
  },

  _onChange: function(){
    this.setState({photos: PhotoStore.fetchPopularPhotos()});
  },



  pxLogin: function(){

    _500px.login(function (status) {
        if (status == 'authorized') {
            alert('You have logged in');

        } else {
            alert('You denied my application');
        }
    });

  },




  _handleLogin: function(){
    var _loggedIn;

    if(_loggedIn){
      return <div> HI welcome</div>;

    }else{
      return <button onClick={this.pxLogin}>Login</button>;
    }
  },


  setPhotoPosition : function(){

    if(!document.getElementById("photo-container")){
      return [[0,0,0,0]];
    }


    var position =[];  //[height, width, top, left]

    var container = document.getElementById("photo-container").getBoundingClientRect();
    containerWidth = container.width;
    var length = this.state.photos.length;
    var photos = this.state.photos;
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


    return position;
  },


  render: function(){

    var position = this.setPhotoPosition(); // get all the position of the photo to display

    if(this.state.photos.length>0){ // there was an css issue where the container shrinks after I set the position of the photos
      //this conditional resets the container
      var container = document.getElementById("photo-container");
      container.style.width = containerWidth+"px";
    }

    return (
      <div className="home-page">HomePage

        {this._handleLogin()}
        <button onClick = {this.setPhotoPosition}>click</button>
        <div className = "popular-photos-list" id = "photo-container" style = {{"height": "0px",   "minWidth": 300 }}>
          {

            this.state.photos.map(function(photo,i){



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

                  <img className = "popular-image" draggable="false" style = {{ "top": edge, "left": edge,"height" : position[i][0]-edge*2,
                      "width" : position[i][1]-edge*2}} src={photo.image_url} onClick = {function(){
                        if(photo.image_url){
                          var win = window.open("https://500px.com/photo/" + photo.id, '_blank');
                          win.focus();
                        }else{
                          photo.image_url = photo.safe_image_url;
                          this.forceUpdate();
                        }
                      }.bind(this)}/>;

                  <div className = "image-top-fade" on style={{ "top": edge, "left": edge,"height" : fadeHeight,
                    "width" : position[i][1]-edge*2}} />
                  <div className = "image-bot-fade" style={{ "top": position[i][0]-edge-fadeHeight, "left": edge,"height" : fadeHeight,
                    "width" : position[i][1]-edge*2}} />

                  <img className = "author-photo" onClick={function(){
                      var win = window.open("https://500px.com/" + photo.user.username, '_blank'); win.focus();}}
                      style={{ "top": position[i][0]-edge-profilePictureSize, "left": edge+edge,
                        "height": profilePictureSize, "width": profilePictureSize}} src={photo.user.userpic_url}/>

                      <div className = "author-username" onClick={function(){
                    var win = window.open("https://500px.com/" + photo.user.username, '_blank'); win.focus();}}
                     style={{ "top": (position[i][0]-edge)-(fontHeight/2)-(profilePictureSize/2), "left": edge+profilePictureSize+2*edge, "height": fontHeight}}>{photo.user.username}</div>



                  <div className = "image-views" style={{ "left": edge+edge, "top": edge}}>
                    <i className="material-icons md-light space-right">&#xE417;</i>
                    {photo.times_viewed}
                  </div>

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
