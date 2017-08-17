import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  status: DS.attr('string'),
  user: DS.belongsTo('user'),
  tasktype: DS.belongsTo('tasktype')

});
