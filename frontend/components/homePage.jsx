//react
var React = require('react');
//actions
var PhotosClientActions = require('../actions/PhotosClientActions');
//stores
var PhotoStore = require('../stores/photosStore');

//image sizes
var ImageSize = require('../util/imageSizes');

var image_size = 20;

var imageHeight = 300;








var HomePage = React.createClass({
  getInitialState: function () {
    return { photos: [] };
  },

  componentDidMount: function(){
    PhotosClientActions.fetchPopularPhotos(image_size);
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
    // var dynamicSizes = this.state.photos.map(function(photo){
    //   return [photo.width/photo.height, photo.width*(imageHeight/photo.height)]; //[ratio (h/r), resized_width]
    // });
    //

    if(!document.getElementById("photo-container")){
      return [[0,0,0,0]];
    }


    var position =[];  //[height, width, top, left]

    var container = document.getElementById("photo-container").getBoundingClientRect();

    var length = this.state.photos.length;
    var photos = this.state.photos;
    var i = 0;
    var row = [];
    var rowWidth = 0;
    var corner = [0,0];
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
              position.push([imageHeight*scale, photoWidth*scale, corner[0], nextcorner]);
              nextcorner+=photoWidth*scale;

            });



            corner[0]+=imageHeight*scale;
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
      position.push([imageHeight, photoWidth, corner[0], nextcorner]);
      nextcorner+=photoWidth*scale;

    });


    return position;
  },


  render: function(){

    var position = this.setPhotoPosition();

    return (
      <div className="home-page">HomePage

        {this._handleLogin()}
        <button onClick = {this.setPhotoPosition}>click</button>
        <div className = "popular-photos-list" id = "photo-container" style = {{"height": "400px" }}>
          {

            this.state.photos.map(function(photo,i){
              // var hs = (photo.width/photo.height); // horizontal scale
              // var width = hs*parseInt(ImageSize[image_size]).toString();
              // var height = ImageSize[image_size];

              return <div className = "popular-image-container" style = {{ "top": position[i][2], "left": position[i][3], "height" : position[i][0],
                "width" : position[i][1]}} key = {photo.id}>

                <img className = "popular-image" draggable="false" style = {{"height" : position[i][0],
                  "width" : position[i][1]}} src={photo.image_url}/>

              </div>;
            })
          }
        </div>


      </div>
    );
  }
});

module.exports = HomePage;

//<div className = "image-overlay" style = {{"height" : height, "width" : width}} />
