import Component, { tracked } from '@glimmer/component';

export default class DrawPot extends Component {
  @tracked public drawDone: boolean = false;

  public draw(): void {
    this.drawDone = true;
    this.args.drawAction();
  }

  get number(): number {
    return this.args.index + 1;
  }
}
