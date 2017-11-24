import Component, { tracked } from '@glimmer/component';

export default class DrawPot extends Component {
  public draw(): void {
    this.args.drawAction();
  }

  get number(): number {
    return this.args.index + 1;
  }

  @tracked('args')
  get drawButtonDisabled() {
    return !this.args.drawButtonEnabled;
  }
}
