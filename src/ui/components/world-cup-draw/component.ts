import Component, { tracked } from '@glimmer/component';
import getDrawPots from './../../../utils/pots';

export default class WorldCupDraw extends Component {
  @tracked pots = [];
  @tracked groups = {};

  constructor(options) {
    super(options);
    
    this.resetDraw();
  }

  drawTeam(groupLetter: string, potIndex: number) {
    const pot = this.pots[potIndex];
    const groupToUpdate = this.groups[groupLetter];

    const conferedationsInGroup = groupToUpdate.map(t => t.confederation);
    let availableTeams = pot
      .filter(t => t.picked !== true)
      .filter(t => t.confederation === 'UEFA' || !(conferedationsInGroup.includes(t.confederation)));

    const randomIndex = Math.floor(Math.random() * availableTeams.length);
    const team = availableTeams[randomIndex];
    team.picked = true;

    groupToUpdate[potIndex] = team;

    // Reassign to force component updates
    this.groups = {...this.groups, [groupLetter]: groupToUpdate};
  }

  resetDraw() {
    this.pots = getDrawPots();
    this.groups = {};

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
