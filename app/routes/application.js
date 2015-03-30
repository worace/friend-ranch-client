
import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    console.log("Application Controller SetupController: ", controller, model);
    this._super(controller, model);
    this.controllerFor('application').set('currentUser', model);
    this.controllerFor('application').set('isLoggedIn', true);
  },
  beforeModel: function() {
    if(this.authToken() === undefined) {
      console.log("no token, go log in");
      this.transitionTo("login");
    }
  },
  model: function() {
    console.log("getting model from app route");
    return this.loginWithToken(this.authToken());
  },
  authToken: function() {
    return Ember.$.cookie("authToken");
  },
  loginUrl: "http://localhost:3000/api/v1/me",
  loginWithToken: function(token) {
    console.log("login with token ", token);
    return Ember.$.ajax({
            type : "GET",
            url : this.loginUrl,
            headers: {
              "X-FriendRanchToken": token
            },
            dataType : "json",
            success : function(data) {
              console.log("loginWithToken Success, got user data: ", data.user);
              var user = this.store.createRecord("user", data.user);
              window.currentUser = user;
              //console.log("controller woo", this.controllerFor("application"));
              //this.controllerFor('application').set('currentUser', user);
              //this.controllerFor('application').set('isLoggedIn', true);
              this.transitionTo("calendar");
            }.bind(this),
            error : function(data) {
              console.log("Auth Token is no good, transition to login route");
              console.log("got data: ", data);
              this.transitionTo("login");
            }.bind(this)
    });
  }
});
