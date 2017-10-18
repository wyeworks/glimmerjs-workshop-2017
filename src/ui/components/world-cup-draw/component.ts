import Component, { tracked } from '@glimmer/component';
import Pots from './../../../utils/pots';

export default class WorldCupDraw extends Component {
  pots = Pots.slice();
  @tracked groups = {};

  constructor(options) {
    super(options);
    
    const rusia = this.pots[0].shift();
    this.groups = {
      'A': [rusia, null, null, null],
      'B': [null, null, null, null]
    };
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
}
