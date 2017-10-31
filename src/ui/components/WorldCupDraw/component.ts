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

  @tracked group: Team[] = Array(4)

  drawTeamFromPot(): void {
    const randomIndex = Math.floor(Math.random() * this.teams.length);
    const selectedTeam: Team = this.teams[randomIndex];

    selectedTeam.drawn = true;
    this.group = [selectedTeam, ...this.group.slice(1)];
  }
}