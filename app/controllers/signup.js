import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createUser: function() {
      var params = {
        email: this.get("email"),
        name: this.get("name"),
        password: this.get("password"),
        password_confirmation: this.get("password_confirmation")
      }
      var user = this.store.createRecord('user', params);

      user.save().then(this.success.bind(this), this.error.bind(this));
    }
  },
  success: function(user) {
    Ember.$.cookie("authToken", user.get("token"));
    this.transitionToRoute("calendar");
  },
  error: function(response) {
    var errors = JSON.parse(response.responseText).errors
    this.set("errors", errors);
  }
});
