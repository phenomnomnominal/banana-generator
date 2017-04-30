export class OutputInfo {
    constructor (inputs, member) {
        this.name = member.name.text;

        let input = inputs.find(input => this.name === `${input.name}Change`);
        if (input) {
            input.twoWay = true;
            this.twoWay = true;
        }
    }
}
