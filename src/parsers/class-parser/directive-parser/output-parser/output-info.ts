// Dependencies:
import { CallExpression, ClassElement, Decorator } from 'typescript';

export class OutputInfo {
    public name: string;
    public twoWay = false;
    public type: string;

    constructor (input: Decorator, member: ClassElement) {
        if (!member.name) {
            throw new Error('Could not find "name" for @Output()');
        }
        this.name = member.name.getText();

        let [rename] = (input.expression as CallExpression).arguments;
        if (rename) {
            this.name = rename.getText().replace(/'/g, '');
        }
    }

    public setType (type: string): void {
        this.type = type;
    }
}
