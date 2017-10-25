import Component, { tracked } from '@glimmer/component';

export default class WcPot extends Component {
  @tracked drawn:boolean = false;
  potTitle:string = `Pot ${this.args.number + 1}`;

  @tracked('drawn')
  get containerClass() {
    return this.drawn ? 'drawn' : '';
  }

  drawPot() {
    this.drawn = true;
    this.args.drawPot();
  }
};
