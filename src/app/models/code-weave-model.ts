import { WeaveSet } from './weave-set';

export class CodeWeaveModel {
  public Version = 1;
  public Take = 'What the {f} is going on {h}';
  public WeaveSets: WeaveSet[] = [
    new WeaveSet('{f}', ['fudge', 'trump', 'rump']),
    new WeaveSet('{h}', ['here', 'there'])
  ];

  WeaveSubstitution = 'rosey';
  WeaveValues = 'posey\r\nhosey\r\nTrump';
  FilterIn = '';
}
