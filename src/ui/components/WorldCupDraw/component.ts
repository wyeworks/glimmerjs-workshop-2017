import Component, { tracked } from '@glimmer/component';

export default class WorldCupDraw extends Component {
  public teams: string[] = ['Alemania', 'Polonia', 'Portugal', 'Francia', 'Bélgica', 'Argentina', 'Brasil'];
  @tracked public group: string[] = Array(4);

  public drawTeamFromPot(): void {
    const randomIndex = Math.floor(Math.random() * this.teams.length);
    const selectedTeam: string = this.teams[randomIndex];

    this.group = [selectedTeam, ...this.group.slice(1)];
  }
}
