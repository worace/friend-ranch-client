
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if(this.authToken() === undefined) {
      this.transitionTo("login");
    } else {
      this.loginWithToken(this.authToken());
    }
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
              this.controllerFor('application').set('currentUser', user);
              this.controllerFor('application').set('isLoggedIn', true);
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
