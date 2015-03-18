var Client = {
  fetchSessionData: function(token) {
    return Ember.$.getJSON('me');
  },
  url: function(path) {
    return "http://localhost:3000/api/v1/" + path
  }
}
