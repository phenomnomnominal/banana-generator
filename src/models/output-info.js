// Dependencies:
import { findDecorator } from '../utilities/utilities';

export function findOutputs (inputs, members) {
    let outputs = [];
    members.forEach(member => {
        let output = findDecorator(member.decorators, 'Output');
        if (output) {
            outputs.push(new OutputInfo(output, member, inputs));
        }
    });
    return outputs;
}

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
