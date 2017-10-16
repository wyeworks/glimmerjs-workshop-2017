import Component from '@glimmer/component';

export default class WorldCupDraw extends Component {
  get groupA() {
    return { teams: ['Argentina', 'Italia', 'Panama', 'Corea del Sur'] };
  }
}
