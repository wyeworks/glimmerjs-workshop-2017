import Component, { tracked } from '@glimmer/component';

export default class WorldCupDraw extends Component {
  teams: string[] = ['Alemania', 'Polonia', 'Portugal', 'Francia', 'Bélgica', 'Argentina', 'Brasil']
  @tracked group: string[] = Array(4)

  drawTeamFromPot(): void {
    const randomIndex = Math.floor(Math.random() * this.teams.length);
    const selectedTeam: string = this.teams[randomIndex];

    this.group = [selectedTeam, ...this.group.slice(1)];
  }
}