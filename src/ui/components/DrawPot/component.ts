import Component, { tracked } from '@glimmer/component';

export default class DrawPot extends Component {
  @tracked public selectedTeam: string;

  public draw(): void {
    this.selectedTeam = this.drawTeam();
  }

  private drawTeam(): string {
    const teams: string[] = this.args.teams;
    const randomIndex = Math.floor(Math.random() * teams.length);

    return teams[randomIndex];
  }
}
