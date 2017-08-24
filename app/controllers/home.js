import Ember from 'ember';

export default Ember.Controller.extend({
  tasks: Ember.computed(function() {
    return this.get('store').findAll('task');
  }),

  selectedTask: null,

  todoTasks: Ember.computed('tasks.length', 'tasks.@each.status', function() {
    return this.get('tasks').filterBy('status','todo')
  }),
  progressTasks: Ember.computed('tasks.length', 'tasks.@each.status', function() {
    return this.get('tasks').filterBy('status','progress')
  }),
  doneTasks: Ember.computed('tasks.length', 'tasks.@each.status', function() {
    return this.get('tasks').filterBy('status','done')
  }),

  users: Ember.computed(function() {
    return this.get('store').findAll('user');
  }),


  tasktypes: Ember.computed(function() {
    return this.get('store').findAll('tasktype');
  }),

  newTask: Ember.computed(function() {
    return this.store.createRecord('task');
  }),

  isShowingModal: false,
  isShowingTodo: false,
  isShowingProgress: false,
  isShowingDone: false,


  actions: {

    addTask(task){
      task.set('status', "todo");
      task.save();
      this.send('toggleModal');
      this.set('newTask', this.store.createRecord('task'));
    },

    deleteTask(taskid) {
        let store = this.get('store');
        store.findRecord('task', taskid, { backgroundReload: false }).then(function(task) {
        task.destroyRecord();
      });
    },



    toggleModal: function() {
        this.toggleProperty('isShowingModal');
    },



    toggleTodo: function() {
        this.toggleProperty('isShowingTodo');
    },
    toggleProgress: function() {
        this.toggleProperty('isShowingProgress');
    },
    toggleDone: function() {
        this.toggleProperty('isShowingDone');
    },



    setSelectedTask(task, isShowingTask) {
      this.set('selectedTask', task)
      this.toggleProperty(isShowingTask);
    },



    updateStatus: function(task, ops) {

      var status = ops.target.status;
      task.set("status", status);
      task.save();
    },

    togglePika() {
      this.toggleProperty('showPika');
    }
  }
});
