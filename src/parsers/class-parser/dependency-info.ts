// Dependencies:
import { Decorator } from 'typescript';

export class DependencyInfo {
    public optional: boolean = false;
    constructor (
        public name: string
    ) { }

    public setOptional (optional: Decorator | null) {
        this.optional = !!optional;
    }
}
