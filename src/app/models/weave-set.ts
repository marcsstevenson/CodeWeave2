// A weave set consists of a list of Weave Values and one Take value
// 2019.03.24 - this is yet to be implemented. It would allow for multi-column code weaves.
export class WeaveSet {
  public constructor(
    public SubstitutionValue: string
    , public SwapValues: string[]
    , public Enabled: boolean = true) {
  }
}
