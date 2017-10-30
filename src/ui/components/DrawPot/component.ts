import Component from '@glimmer/component';

export default class DrawPot extends Component {
  draw() {
    alert(`The selected team is: ${this._drawTeam()}`);
  }

  _drawTeam(): string {
    const teams: string[] = this.args.teams;
    const randomIndex = Math.floor(Math.random() * teams.length);

    return teams[randomIndex];
  }
};
