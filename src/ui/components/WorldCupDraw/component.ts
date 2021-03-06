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

const TEAM_TO_HIGHLIGHT: string = 'Uruguay';

export default class WorldCupDraw extends Component {
  public pots: Pot[] = getTeamsInPots();
  @tracked public groups: Group[];
  @tracked public nextPotToDraw: number;

  constructor(options) {
    super(options);
    this.resetDraw();
  }

  public drawPot(potIndex): void {
    const groups: Group[] = drawPot(potIndex, this.pots[potIndex], this.groups);

    // Just replacing the root element does not work,
    // Creating a deep copy of the array of arrays
    this.groups = groups.map((g) => g.slice());

    this.nextPotToDraw++;
  }

  public resetDraw(): void {
    this.groups = Array.from(Array(8), (_) => Array(4));
    this.groups[0][0] = getHostTeam();
    this.nextPotToDraw = 0;
  }

  @tracked('groups')
  get highlightedGroup(): Group {
    const teamToHighlightFn = (t: ITeam) => t && t.name === TEAM_TO_HIGHLIGHT;
    return this.groups.find((g) => g.some(teamToHighlightFn));
  }
}
