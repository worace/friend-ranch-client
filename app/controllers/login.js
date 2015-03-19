import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function() {
      var email = this.get("email")
      var password = this.get("password")
      return this.loginWithEmailAndPW(email, password)
    }
  },
  loginUrl: "http://localhost:3000/api/v1/sessions",
  loginWithEmailAndPW: function(email, password) {
    Ember.$.ajax({
        type : "POST",
        url : this.loginUrl,
        data : "email="+email+"&password="+password,
        dataType : "json",
        success : function(data) {
          Ember.$.cookie("authToken", data.user.token);
          window.currentUser = this.store.createRecord("user", data.user);
          this.transitionTo("calendar")
        }.bind(this)
    });
  }
});
