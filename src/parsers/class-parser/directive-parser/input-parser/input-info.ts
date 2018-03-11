// Dependencies:
import { CallExpression, ClassElement, Decorator } from 'typescript';

export class InputInfo {
    public name: string;
    public twoWay = false;
    public type: string;

    constructor (input: Decorator, member: ClassElement) {
        if (!member.name) {
            throw new Error('Could not find "name" for @Input()');
        }
        this.name = member.name.getText();

        let [rename] = (input.expression as CallExpression).arguments;
        if (rename) {
            this.name = rename.getText();
        }
    }

    public setType (type: string): void {
        this.type = type;
    }
}
