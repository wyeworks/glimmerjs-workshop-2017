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
  public teams: Pot = getTeamsInPots()[0];

  @tracked public groups: Group[] = Array.from(Array(8), (_) => Array(4));

  constructor(options) {
    super(options);
    this.groups[0][0] = getHostTeam();
  }

  public drawPot(): void {
    const groups: Group[] = drawPot(0, this.teams, this.groups);

    // Just replacing the root element does not work,
    // Creating a deep copy of the array of arrays
    this.groups = groups.map((g) => g.slice());
  }
}
