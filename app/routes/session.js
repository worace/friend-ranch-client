import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if(this.authToken() === undefined) {
      console.log("no token, go log in");
      this.transitionTo("login");
    }
  },
  model: function() {
    return Client.fetchSessionData(Ember.$.cookie("authToken"));
  },
  authToken: function() {
    return Ember.$.cookie("authToken");
  }
});
