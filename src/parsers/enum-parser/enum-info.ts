export class EnumInfo {
    public values: Array<string>;

    constructor (
        public name: string
    ) { }

    public setValues (values: Array<string>): void {
        this.values = values;
    }
}
