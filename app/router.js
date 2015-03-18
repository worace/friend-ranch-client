import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('session', {path: '/'});
  this.route('login', {path: '/login'});
  this.route('signup', {path: '/signup'});
  this.route('user', {path: "/users/:user_id"});
});

export default Router;
