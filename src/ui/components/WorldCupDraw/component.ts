import Component, { tracked } from '@glimmer/component';

import {
  Confederation,
  drawPot,
  getHostTeam,
  getTeamsInPots,
  Group,
  ITeam,
  Pot
} from '../../../utils/draw';

export default class WorldCupDraw extends Component {
  public pots: Pot[] = getTeamsInPots();
  @tracked public groups: Group[] = Array.from(Array(8), (_) => Array(4));

  constructor(options) {
    super(options);
    this.groups[0][0] = getHostTeam();
  }

  public drawPot(potIndex): void {
    const groups: Group[] = drawPot(potIndex, this.pots[potIndex], this.groups);

    // Just replacing the root element does not work,
    // Creating a deep copy of the array of arrays
    this.groups = groups.map((g) => g.slice());
  }
}
