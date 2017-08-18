import Ember from 'ember';

export default Ember.Controller.extend({
  users: Ember.computed(function() {
    return this.get('store').findAll('user');
  }),


  tasktypes: Ember.computed(function() {
    return this.get('store').findAll('tasktype');
  }),
});
