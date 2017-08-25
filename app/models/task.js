import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  description: [ validator('presence', true),
  validator('length', {
    min: 5,
    max: 100
  })
],
  status: validator('presence', true),
});

export default DS.Model.extend(Validations, {
  description: DS.attr('string'),
  status: DS.attr('string'),
  user: DS.belongsTo('user'),
  tasktype: DS.belongsTo('tasktype')

});
