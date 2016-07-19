//react
var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    Modal = require("react-modal");
//actions
var GalleryClientActions = require('../../actions/galleryClientActions');

var selected;
var style = {
  overlay : {
		    position        : 'fixed',
		    top             : 0,
		    left            : 0,
		    right           : 0,
		    bottom          : 0,
		    backgroundColor : 'rgba(0, 0, 0, 0.80)',
		    zIndex          : 1000,
		  },
		  content : {
        top             : '50%',
        left            : '50%',
        width           : '60%',
        height          : '70%',
        minWidth        : '700px',
        maxWidth        : '1100px',
		    position        : 'fixed',
				margin          : '0 auto',
		    border          : 'none',
		    zIndex          : 1001,
        overflowY       : 'scroll',
        WebkitOverflowScrolling    : 'touch',
        backgroundColor : 'white',
        transform       : 'translateX(-50%) translateY(-50%)',
        overflow        : 'hidden',
        borderRadius    : '10px'

      }
		};





var collectionModal = React.createClass({

    getInitialState: function(){
      return({ modalOpen: false });
    },

    componentWillMount: function(){
      Modal.setAppElement('body');
    },

    openModal: function() {
      this.setState({modalIsOpen: true});
    },

    afterOpenModal: function() {

    },

    closeModal: function() {
      this.setState({modalIsOpen: false});
    },

    goToItem: function(like){

    },


    render: function(){


      return (
         <div className = "image-collection" style={{ "left": (this.props.position[1])-(this.props.edge*2)-50-3, "top": (this.props.position[0]-this.props.edge)-(this.props.fontHeight/2)-(this.props.profilePictureSize/2)}}>
             <i className="material-icons md-light space-right hyellow collection-icon" onClick = {function(e){e.stopPropagation(); this.openModal();}.bind(this)}>&#xE02E;</i>
             <Modal className = "collection-modal modal-outer"
               isOpen={this.state.modalIsOpen}
               onAfterOpen={this.afterOpenModal}
               onRequestClose={this.closeModal}
               style={style}>
               <div className = "collection-modal-frame">
                 <div className = "collection-modal-left">
                   <div className = "collection-modal-image-overlay"></div>
                   <img className = "collection-modal-image" src = {this.props.photo.image_url}></img>
                 </div>
                 <div className="collection-modal-right">
                    <ul className = "collections-container">
                      {this.props.galleries.map(function(gallery){
                        return <li key = {gallery.id} className = "gallery-item"
                          onClick = {function(){
                            GalleryClientActions.postToGallery(this.props.user, gallery, this.props.photo)
                            
                          }.bind(this)}>
                          <div className = "gallery-cover-container">
                            <img className = "gallery-cover" src={gallery.cover_photo[0].url} />
                          </div>
                          <div className = "add-gallery-button">
                            <i className = "material-icons md-48 add-gallery-icon">&#xE146;</i>
                            <div className = "add-gallery-text">{gallery.name}</div>
                          </div>
                        </li>;
                      }.bind(this))}
                    </ul>
                 </div>
               </div>


             </Modal>
         </div>
       );
      }
});


module.exports = collectionModal;
