export class OutputInfo {
    constructor (output, member, inputs) {
        this.name = member.name.text;

        let args = output.expression.arguments;
        if (args) {
            let [rename] = args;
            if (rename) {
                this.name = rename.text;
            }
        }

        let input = inputs.find(input => this.name === `${input.name}Change`);
        if (input) {
            input.twoWay = true;
            this.twoWay = true;
        }
    }
}
