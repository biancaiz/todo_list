import Ember from 'ember';

export default Ember.Controller.extend({

  users: Ember.computed(function() {
    return this.get('store').findAll('user');
  }),

  tasktypes: Ember.computed(function() {
    return this.get('store').findAll('tasktype');
  }),

  newUser: null,
  newTaskType: null,


  actions: {
    
    addUser(newUser) {
       const us = this.store.createRecord('user', {
         name: newUser
       });

       us.validate()
       .then(({ validations}) => {
         if (validations.get('isValid')) {
           us.save()
           .then(() => this.set('showSaved', true));
           this.set('newUser', '');
         }
         this.set('didValidate', true)
       });
      },

     addTaskType(newTaskType) {
       const tt = this.store.createRecord('tasktype', {
         name: newTaskType
       });

       tt.validate()
       .then(({ validations}) => {
         if (validations.get('isValid')) {
           us.save()
           .then(() => this.set('showSaved', true));
           this.set('newTaskType', '');
         }
         this.set('didValidate', true)
       });
    },


    deleteUser(userId) {
      let store = this.get('store');
      store.findRecord('user', userId, { backgroundReload: false }).then(function(user) {
      user.deleteRecord();
      user.get('isDeleted');
      user.save();
      });
    },

    deleteTaskType(taskTypeId) {
      let store = this.get('store');
      store.findRecord('tasktype', taskTypeId, { backgroundReload: false }).then(function(tasktype) {
      tasktype.deleteRecord();
      tasktype.get('isDeleted');
      tasktype.save();
      });
    }
  }
});
