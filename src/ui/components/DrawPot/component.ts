import Component, { tracked } from '@glimmer/component';

export default class DrawPot extends Component {
  @tracked drawDone: boolean = false;

  draw(): void {
    this.drawDone = true;
    this.args.drawAction();
  }
}
