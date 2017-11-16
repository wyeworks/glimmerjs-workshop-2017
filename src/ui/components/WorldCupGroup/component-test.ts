import hbs from '@glimmer/inline-precompile';
import { setupRenderingTest } from '@glimmer/test-helpers';

const { module, test } = QUnit;

module('Component: WorldCupGroup', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the group A', async function(assert) {
    await this.render(hbs`<WorldCupGroup @groupIndex={{0}} />`);

    const titleElement = this.containerElement.querySelector('.group-title');

    assert.equal(titleElement.textContent, "Group A");
  });

  test('it renders the group B', async function(assert) {
    await this.render(hbs`<WorldCupGroup @groupIndex={{1}} />`);

    const titleElement = this.containerElement.querySelector('.group-title');

    assert.equal(titleElement.textContent, "Group B");
  });
});
