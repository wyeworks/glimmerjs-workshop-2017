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

    for (var letter = 'A'; letter <= 'H'; letter = this._incrementLetter(letter)) {
      this.groups[letter] = new Array(4);
    }

    const rusia = this.pots[0].shift();
    this.groups['A'][0] = rusia;
  }

  _incrementLetter(letter: string) {
    return String.fromCharCode(letter.charCodeAt(0) + 1)
  }
}
