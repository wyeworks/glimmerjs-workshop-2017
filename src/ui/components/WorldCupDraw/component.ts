import Component, { tracked } from '@glimmer/component';

import {
  Team,
  Confederation,
  getTeamsInPots,
  getHostTeam,
  drawPot
} from '../../../utils/draw';

export default class WorldCupDraw extends Component {
  pots: Team[][] = getTeamsInPots()
  @tracked groups: Team[][] = Array.from(Array(8), _ => Array(4))

  constructor(options) {
    super(options);
    this.groups[0][0] = getHostTeam();
  }

  drawPot(potIndex): void {
    const groups: Team[][] = drawPot(potIndex, this.pots[potIndex], this.groups);
    this.groups = [...groups];
  }
}