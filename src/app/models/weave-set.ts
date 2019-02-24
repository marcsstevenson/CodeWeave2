// A weave set consists of a list of Weave Values and one Take value
// 2019.03.24 - this is yet to be implemented. It would allow for multi-column code weaves.
export class WeaveSet {
  public constructor(
    substitutionValue: string,
    swapValues: string[],
    //public Enabled: boolean = true,
    //public SwapValuesText: string = null
  ) {
    this.SubstitutionValue = substitutionValue;

    let swapValuesText = '';

    for (let i = 0; i < swapValues.length; i++) {
      if (i > 0) {
        swapValuesText += '\n';
      }

      swapValuesText += swapValues[i];
    }

    this.SwapValuesText = swapValuesText;
    // this.blah = GetSwapValues();
  }

  public SubstitutionValue: string;
  public SwapValuesText: string;

  public GetSwapValues = function(): string[] {
    return this.SwapValuesText.split('\n');
  };
}
