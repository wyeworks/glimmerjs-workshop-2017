import Component, { tracked } from '@glimmer/component';

export default class WcGroup extends Component {
  @tracked teams = [null, null, null, null];

  constructor(options) {
    super(options);
    
    if (this.args.headTeam) {
      this.teams[0] = this.args.headTeam;
    }
  }

  @tracked('teams')
  get teamNames() {
    return this.teams.map( t => t && t.name );
  }
};
