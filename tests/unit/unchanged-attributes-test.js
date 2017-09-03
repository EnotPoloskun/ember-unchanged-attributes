import Ember from 'ember';
import {
  moduleForModel,
  test
}
from 'ember-qunit';

moduleForModel('user', 'Unit | UnchnagedAttribugtes | DS.Model');

test('create model with defaults', function(assert) {
  let object = this.subject();

  assert.equal(object.get('unchangedName'), undefined, 'equal to name');
  assert.equal(object.get('unchangedCountry'), 'Belarus', 'equal to country');

  Ember.run(() => {
    object.set('name', 'Pavel');
    object.set('country', 'USA');
  });

  assert.equal(object.get('unchangedName'), undefined, 'equal to original name value');
  assert.equal(object.get('unchangedCountry'), 'Belarus', 'equal to original country value');
  assert.equal(object.get('hasDirtyAttributes'), true, 'equal to name');

  // Fake save
  Ember.run(() => {
    object._internalModel.send('willCommit');
    object._internalModel._attributes = {};
    object._internalModel.send('didCommit');
  });

  assert.equal(object.get('hasDirtyAttributes'), false, 'equal to name');
  assert.equal(object.get('unchangedName'), 'Pavel', 'equal to name');
  assert.equal(object.get('unchangedCountry'), 'USA', 'equal to country');
});
