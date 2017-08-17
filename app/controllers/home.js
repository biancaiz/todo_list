import Ember from 'ember';

export default Ember.Controller.extend({

  todoTasks: Ember.computed('tasks', function() {
    return this.get('store').peekAll('task').filterBy('status','todo')
  }),
  progressTasks: Ember.computed('tasks', function() {
    return this.get('store').peekAll('task').filterBy('status','progress')
  }),
  doneTasks: Ember.computed('tasks', function() {
    return this.get('store').peekAll('task').filterBy('status','done')
  }),

  users: Ember.computed(function() {
    return this.get('store').findAll('user');
  }),
  tasks: Ember.computed(function() {
    return this.get('store').findAll('task');
  }),
  tasktypes: Ember.computed(function() {
    return this.get('store').findAll('tasktype');
  }),

  isShowingModal: false,

  actions: {
    deleteTask(taskid) {
        let store = this.get('store');
        store.findRecord('task', taskid, { backgroundReload: false }).then(function(task) {
          task.destroyRecord();
      });
    },
    addTask(taskDescription, userId, tasktypeId){
      const u = this.store.createRecord('task', {
        description: taskDescription,
        user: this.store.peekRecord('user', userId),
        tasktype: this.store.peekRecord('tasktype', tasktypeId)
      }).save();
    },
    toggleModal: function() {
        this.toggleProperty('isShowingModal');
    }
  }
});
