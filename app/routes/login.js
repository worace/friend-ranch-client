import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    console.log("LoginRoute Before Model");
  }
});