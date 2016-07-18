//React
var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router');
//Routes
var Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory;

//components
var HomePage = require("./components/homePage");






var App = React.createClass({
  render: function(){
    return (
      <div className = "container">
        {this.props.children}
      </div>
    );
  }
});

var AppRouter = (
  <Router history={hashHistory}>
    <Route path="/" components={App}>
      <IndexRoute component={HomePage}/>
    </Route>
  </Router>
);

//<Route path="home" components={HomePage}/>

document.addEventListener('DOMContentLoaded', function(){
  _500px.init({
     sdk_key: '440b39a5a88d1dc3dc7536a15d2e50cd093e9c69'
   });


   _500px.getAuthorizationStatus(function (status) {
     if (status == 'not_logged_in' || status == 'not_authorized') {
         _500px.login();
     }
   });
   console.log("jo")


  var root = document.getElementById('content');
  ReactDOM.render(AppRouter,root);
});
