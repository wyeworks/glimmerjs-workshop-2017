import hbs from '@glimmer/inline-precompile';
import { setupRenderingTest } from '@glimmer/test-helpers';

const { module, test } = QUnit;

module('Component: WorldCupDraw', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders 8 groups', async function(assert) {
    await this.render(hbs`<WorldCupDraw />`);

    const groupItemElements = this.containerElement.querySelectorAll('.group-item');
    assert.equal(groupItemElements.length, 8);
  });

  test('it renders group C', async function(assert) {
    await this.render(hbs`<WorldCupDraw />`);

    const groupItemElement = this.containerElement.querySelector('.group-item:nth-child(3) .group-title');
    assert.equal(groupItemElement.textContent, 'Group C');
  });
});
