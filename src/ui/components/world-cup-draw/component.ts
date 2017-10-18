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

  @tracked('groups')
  get groupA() {
    return this.groups['A'];
  };

  @tracked('groups')
  get groupB() {
    return this.groups['B'];
  };

  drawTeam(groupLetter: string, potIndex: number) {
    const pot = this.pots[potIndex];
    const randomIndex = Math.floor(Math.random() * pot.length);
    const team = pot[randomIndex];
    
    pot.splice(randomIndex, 1);

    let updatedGroup = {}
    updatedGroup[groupLetter] = this.groups[groupLetter];
    updatedGroup[groupLetter][potIndex] = team;

    // Reassign to force component updates
    this.groups = {...this.groups, ...updatedGroup}
  }
}
