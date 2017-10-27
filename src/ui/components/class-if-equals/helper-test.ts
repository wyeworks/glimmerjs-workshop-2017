import classIfEquals from './helper';

const { module, test } = QUnit;

module('Helper: class-if-equals', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(classIfEquals([]), undefined);
  });
});
