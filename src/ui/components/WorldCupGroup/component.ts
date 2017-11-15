import Component from '@glimmer/component';

export default class WorldCupGroup extends Component {
  get groupLetter(): string {
    return String.fromCharCode('A'.charCodeAt(0) + this.args.groupIndex)
  }
};
