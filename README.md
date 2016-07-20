#100pops

[live_link][heroku]
[heroku]: https://my100pops.herokuapp.com
100pops is a full-stack web application to display top 100 photos on 500px.com. The front-end is a single page app build using ReactJS. The 100pops uses Ruby on Rails on the back-end.

##Features

100pops had many nice features detailed in the sections below.

###Single-Page App

100pops is a single page app built using React components and `ReactRouter`.

###Display



###Various Categories of 100 Photos

In addition to the default 100 most popular photos, 100pops can also fetch 100 photos of other categories. Additional categories include `upcoming` , `fresh`, `editors`, and `friends`. Friends is related photos.

###Login

The login button is top middle circle. When an user is logged in, the circle shows the user profile picture. The login uses the `_500px` object to make the login request to 500px.

###Liking and Unliking

A logged in user can like and unlike any of the 100 photos. The feature is implemented by calling a `POST` request to `www.500px.com/v1/photos/:photo_id/vote` using the `_500px` object. The request is made when the user clicks on the heart at the bottom left of every photo (hollow heart - not liked, filled heart - already liked). With a success response, a notification is created (read Notification Panel below for more info).

###Adding to collection

A logged in user can add photo to his/her galleries. By click the add to gallery button next to the heart, a modal pops up with the photo and the user's galleries. When the user clicks on one of the galleries, a API request is made to add that photo to the selected gallery. With a success response, a notification is created (read Notification Panel below for more info).

###NSFW Filter

The `NSFW filter` is implemented by rendering a `<div>` element instead of a `<img>` element. When the photos are fetched, a scan is done to check which pictures for NSFW content. The NSFW pictures are marked and put in the photos store. When the pictures are rendered, only those who are SFW are rendered, while the NSFW photos show a grey frame (of the same dimension) with caption "adult content". However, the NSFW photo can still be viewed by clicking on the grey frame. When clicked, the NSFW photo is unmarked and React changes the `<div>` to an `<img>`. Since the grey frame is the same dimension as the picture, the reveal will not force a shift in the positioning of the photos.

###Notification Panel

The `Notification Panel` is implemented by creating a separate `Notification Store` to store notification object that are created on the success of an API request. Upon the success of a API request such as liking a photo, a new notification object is created from the notification constructor.

```var Notificaton = function(id, obj){
  this.id = id;
  this.item1 = obj.item1;
  this.item2 = obj.item2;
  this.action = obj.action;
};

Notificaton.prototype.startTimer = function(){
  window.setTimeout(this.deleteNotification(this), 5000);
};


Notificaton.prototype.deleteNotification = function(notification){
  NotificationClientActions.deleteNotification(notification);
};
```

The notification constructor stores the id of the notification and an object that stores the event and items involved. The id is just an incremented value. The action determines how the notification is rendered (e.g. liking and adding to a gallery). After the notification is put in the store, the deleteNotification method is called to remove the notification after a set time using a asynchronous callback. The deleting feature is necessary to get ride of stale notifications.
