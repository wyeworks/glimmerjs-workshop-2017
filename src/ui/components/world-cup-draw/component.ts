import Component, { tracked } from '@glimmer/component';
import getDrawPots from './../../../utils/pots';

export default class WorldCupDraw extends Component {
  pots = [];
  @tracked groups = {};

  constructor(options) {
    super(options);
    
    this.resetDraw();
  }

  drawTeam(groupLetter: string, potIndex: number) {
    const pot = this.pots[potIndex];
    const randomIndex = Math.floor(Math.random() * pot.length);
    const team = pot[randomIndex];
    
    pot.splice(randomIndex, 1);

    const groupToUpdate = this.groups[groupLetter];
    groupToUpdate[potIndex] = team;

    // Reassign to force component updates
    this.groups = {...this.groups, [groupLetter]: groupToUpdate};
  }

  resetDraw() {
    this.pots = getDrawPots();

    const rusia = this.pots[0].shift();
    this.groups = {
      'A': [rusia, null, null, null],
      'B': [null, null, null, null],
      'C': [null, null, null, null],
      'D': [null, null, null, null],
      'E': [null, null, null, null],
      'F': [null, null, null, null],
      'G': [null, null, null, null],
      'H': [null, null, null, null]
    };
  }
}
