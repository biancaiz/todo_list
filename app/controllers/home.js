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

  isShowingModal: false,
  isShowingTodo: false,
  isShowingProgress: false,
  isShowingDone: false,


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



    addUser(userName){
     const us = this.store.createRecord('user', {
       name: userName
     });
     us.save();
   },

   addTaskType(taskTypeName){
     const tt = this.store.createRecord('tasktype', {
       name: taskTypeName
     });
     tt.save();
   },


    updateStatus: function(task, ops) {

      var status = ops.target.status;
      task.set("status", status);
      task.save();
    },
  }
});
