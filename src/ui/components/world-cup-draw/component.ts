import Component, { tracked } from '@glimmer/component';
import getDrawPots from './../../../utils/pots';

export default class WorldCupDraw extends Component {
  @tracked pots = [];
  @tracked groups = {};

  constructor(options) {
    super(options);
    
    this.resetDraw();
  }

  drawPot(potIndex: number) {
    const pot = this.pots[potIndex].filter(t => t.picked !== true);
    pot.sort(this._sortTeamsByConfederation);
    
    pot.forEach(team => {
      const availableGroups = this._availableGroupsForTeam(team, potIndex);

      if (availableGroups.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableGroups.length);
        const group = availableGroups[randomIndex];
        
        team.picked = true;
        group[potIndex] = team;
    
        // Reassign to force component updates
        const letter = this._groupLetter(group);
        this.groups = {...this.groups, [letter]: group};
      }
    });
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

  _sortTeamsByConfederation(t1, t2) {
    if (t1.confederation === t2.confederation) {
      return 0;
    } else {
      return t1.confederation === 'UEFA' ? 1 : 0;
    }
  }

  _groupsList() {
    return Object.keys(this.groups).map((letter) => {
      return this.groups[letter];
    });
  }

  _availableGroupsForTeam(team, potIndex) {
    return this._groupsList().filter((g) => {
      if (g[potIndex] !== undefined) {
        return false;
      } else if (team.confederation === 'UEFA') {
        return true;
      } else {
        const conferedationsInGroup = g.map(t => t.confederation);
        return !conferedationsInGroup.includes(team.confederation);
      }
    });
  }

  _groupLetter(group) {
    return Object.keys(this.groups).find(key => this.groups[key] === group)
  }
}
