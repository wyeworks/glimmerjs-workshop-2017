import Component, { tracked } from '@glimmer/component';

export default class DrawPot extends Component {
  @tracked selectedTeam: string

  draw() {
    this.selectedTeam = this._drawTeam();
  }

  @tracked('selectedTeam')
  get drawDone(): boolean {
    return !!this.selectedTeam;
  }

  _drawTeam(): string {
    const teams: string[] = this.args.teams;
    const randomIndex = Math.floor(Math.random() * teams.length);

    return teams[randomIndex];
  }
};
