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
      console.log("created user", user);

      user.save().then(this.success.bind(this), this.error.bind(this));
    }
  },
  success: function(user) {
    console.log("success, created user!: ", user);
    this.transitionToRoute("calendar");
  },
  error: function(response) {
    //console.log("error creating user:  ", JSON.parse(response.responseText).errors);
    console.log("who we ", this);
    this.set("pizza", "wat");
    console.log(this.get("pizza"));
    var errors = JSON.parse(response.responseText).errors
    console.log("errrs: ", errors);
    this.set("errors", errors);
    console.log("errrs: ", this.get("errors"));
    //this.set("errors", JSON.parse(response.responseText).errors);
  }
});
