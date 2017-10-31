import Component, { tracked } from '@glimmer/component';

import {
  Team,
  Confederation,
  getTeamsInPots,
  getHostTeam,
  drawPot
} from '../../../utils/draw';

export default class WorldCupDraw extends Component {
  teams: Team[] = getTeamsInPots()[0]

  @tracked groups: Team[][] = Array.from(Array(8), _ => Array(4))

  constructor(options) {
    super(options);
    this.groups[0][0] = getHostTeam();
  }

  drawPot(): void {
    const groups: Team[][] = drawPot(0, this.teams, this.groups);
    this.groups = [...groups];
  }
}