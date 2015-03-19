import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if(this.authToken() === undefined) {
      console.log("no token, go log in");
      this.transitionTo("login");
    }
  },
  model: function() {
    return this.loginWithToken(this.authToken())
    //return Client.fetchSessionData(Ember.$.cookie("authToken"));
  },
  authToken: function() {
    return Ember.$.cookie("authToken");
  },
  loginUrl: "http://localhost:3000/api/v1/me",
  loginWithToken: function(token) {
    console.log("login with token ", token);
    Ember.$.ajax({
        type : "GET",
        url : this.loginUrl,
        headers: {
          "X-FriendRanchToken": token
        },
        dataType : "json",
        success : function(data) {
          window.currentUser = this.store.createRecord("user", data.user);
          this.transitionTo("calendar")
        }.bind(this)
    });
  }
});
