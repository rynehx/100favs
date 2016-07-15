var React = require('react');
var ReactDOM = require('react-dom') ;

var App = React.createClass({
  render: function(){
    return (
      <div>
        hello its me
      </div>
    );
  }
});

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('root');
  ReactDOM.render(<App/>,root);
});
