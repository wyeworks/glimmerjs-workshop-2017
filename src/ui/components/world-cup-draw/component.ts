import Component from '@glimmer/component';
import Pots from './../../../utils/pots';

export default class WorldCupDraw extends Component {
  pots = { ...Pots };
  rusia = this.pots[0].shift();
}
