import Component, { tracked } from '@glimmer/component';

interface ITeam {
  name: string;
  drawn?: boolean;
}

export default class WorldCupDraw extends Component {
  public teams: ITeam[] = [
    { name: 'Alemania' },
    { name: 'Polonia' },
    { name: 'Portugal' },
    { name: 'Francia' },
    { name: 'Bélgica' },
    { name: 'Argentina' },
    { name: 'Brasil' }
  ];

  @tracked public group: ITeam[] = Array(4);

  public drawTeamFromPot(): void {
    const availableTeams: ITeam[] = this.teams.filter((t) => !t.drawn);
    const randomIndex = Math.floor(Math.random() * availableTeams.length);
    const selectedTeam: ITeam = availableTeams[randomIndex];

    selectedTeam.drawn = true;
    this.group = [selectedTeam, ...this.group.slice(1)];
  }
}
