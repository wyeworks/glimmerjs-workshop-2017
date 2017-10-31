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

  @tracked public groups: ITeam[][] = Array.from(Array(8), (_) => Array(4));

  constructor(options) {
    super(options);

    this.groups[0][0] = { name: 'Rusia', drawn: true };
  }

  public drawPot(): void {
    let groups: ITeam[][] = [...this.groups];

    for (let groupIndex = 1; groupIndex < 8; groupIndex++) {
      const selectedTeam = this.drawTeamFromPot();
      groups[groupIndex] = [selectedTeam, ...this.groups[groupIndex].slice(1)];
    }

    this.groups = groups;
  }

  private drawTeamFromPot(): ITeam {
    const availableTeams: ITeam[] = this.teams.filter((t) => !t.drawn);
    const randomIndex = Math.floor(Math.random() * availableTeams.length);
    const selectedTeam: ITeam = availableTeams[randomIndex];

    selectedTeam.drawn = true;
    return selectedTeam;
  }
}
