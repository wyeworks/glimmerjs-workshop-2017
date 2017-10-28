import { setupRenderingTest } from '@glimmer/test-helpers';
import hbs from '@glimmer/inline-precompile';

const { module, test } = QUnit;

module('Component: world-cup-draw', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a title', async function(assert) {
    await this.render(hbs`<world-cup-draw />`);
    assert.equal(this.containerElement.querySelector('h1').textContent, 'Russia 2018 World Cup Draw');
  });

  test('it renders the pots', async function(assert) {
    await this.render(hbs`<world-cup-draw />`);
    const potElements:[HTMLElement] = this.containerElement.querySelectorAll('.pot-container .pot-item');

    assert.equal(potElements.length, 4);
    for (var i = 0; i < 4; i++) {
      const titleElement = potElements[i].querySelector('.pot-title');
      assert.equal(titleElement.textContent, `Pot ${i+1}`);
    }
  });

  test('it renders the groups', async function(assert) {
    await this.render(hbs`<world-cup-draw />`);
    const potElements:[HTMLElement] = this.containerElement.querySelectorAll('.group-container .group-item');

    assert.equal(potElements.length, 8);

    const charForInt = (i) => String.fromCharCode('A'.charCodeAt(0) + i);
    for (var i = 0; i < 8; i++) {
      const titleElement = potElements[i].querySelector('.group-title');
      assert.equal(titleElement.textContent, `Group ${charForInt(i)}`);
    }
  });

  test('it renders a reset button', async function(assert) {
    await this.render(hbs`<world-cup-draw />`);
    const buttonElement = this.containerElement.querySelector('.main-container > .draw-button-container button');

    assert.equal(buttonElement.textContent, 'Reset');
  });
});
