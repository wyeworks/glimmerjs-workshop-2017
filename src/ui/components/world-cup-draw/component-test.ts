import { setupRenderingTest } from '@glimmer/test-helpers';
import hbs from '@glimmer/inline-precompile';

const { module, test } = QUnit;

module('Component: world-cup-draw', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`<world-cup-draw />`);
    assert.equal(this.containerElement.textContent, 'Welcome to Glimmer!\n');
  });
});
