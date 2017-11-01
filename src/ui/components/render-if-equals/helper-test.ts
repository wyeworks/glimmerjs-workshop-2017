import renderIfEquals from './helper';

const { module, test } = QUnit;

module('Helper: render-if-equals', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(renderIfEquals([]), undefined);
  });
});
