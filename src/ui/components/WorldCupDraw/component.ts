import Component, { tracked } from '@glimmer/component';

interface Team {
  name: string,
  drawn?: boolean
}

export default class WorldCupDraw extends Component {
  teams: Team[] = [
    { name: 'Alemania' },
    { name: 'Polonia' },
    { name: 'Portugal' },
    { name: 'Francia' },
    { name: 'Bélgica' },
    { name: 'Argentina' },
    { name: 'Brasil' }
  ]

  @tracked groups: Team[][] = Array.from(Array(8), _ => Array(4))

  drawPot(): void {
    let groups: Team[][] = [];

    for (var groupIndex = 0; groupIndex <= 7; groupIndex++) {
      const selectedTeam = this._drawTeamFromPot();
      groups[groupIndex] = [selectedTeam, ...this.groups[groupIndex].slice(1)];
    }

    this.groups = [...groups];
  }

  _drawTeamFromPot(): Team {
    const randomIndex = Math.floor(Math.random() * this.teams.length);
    const selectedTeam: Team = this.teams[randomIndex];

    selectedTeam.drawn = true;
    return selectedTeam;
  }
}