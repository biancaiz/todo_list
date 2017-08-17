import Ember from 'ember';

export default Ember.Controller.extend({
  tasks: Ember.computed(function() {
    return this.get('store').findAll('task');
  }),


  todoTasks: Ember.computed('tasks.length', function() {
    return this.get('tasks').filterBy('status','todo')
  }),
  progressTasks: Ember.computed('tasks.length', function() {
    return this.get('tasks').filterBy('status','progress')
  }),
  doneTasks: Ember.computed('tasks.length', function() {
    return this.get('tasks').filterBy('status','done')
  }),

  users: Ember.computed(function() {
    return this.get('store').findAll('user');
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
        status: "todo",
        user: this.store.peekRecord('user', userId),
        tasktype: this.store.peekRecord('tasktype', tasktypeId)
      }).save();
    },
    toggleModal: function() {
        this.toggleProperty('isShowingModal');
    }
  }
});
