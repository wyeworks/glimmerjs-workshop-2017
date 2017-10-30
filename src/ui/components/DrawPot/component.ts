import Component from '@glimmer/component';

export default class DrawPot extends Component {
  public draw(): void {
    alert(`The selected team is: ${this.drawTeam()}`);
  }

  private drawTeam(): string {
    const teams: string[] = this.args.teams;
    const randomIndex = Math.floor(Math.random() * teams.length);

    return teams[randomIndex];
  }
}
