import Component from '@glimmer/component';

export default class WorldCupDraw extends Component {
  public teams: string[] = ['Alemania', 'Polonia', 'Portugal', 'Francia', 'Bélgica', 'Argentina', 'Brasil'];
  public group: string[] = Array(4);
}
