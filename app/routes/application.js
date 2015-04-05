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
    return Ember.$.ajax({
            type : "GET",
            url : this.loginUrl,
            headers: {
              "X-FriendRanchToken": token
            },
            dataType : "json",
            success : function(data) {
              var user = this.store.createRecord("user", data.user);
              this.controllerFor('application').set('currentUser', user);
              this.controllerFor('application').set('isLoggedIn', true);
            }.bind(this),
            error : function() {
              this.transitionTo("login");
            }.bind(this)
    });
  }
});
