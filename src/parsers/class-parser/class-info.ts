// Dependencies:
import { DependencyInfo } from './dependency-info';

export class ClassInfo {
    public dependencies: Array<DependencyInfo> = [];
    public implements: Array<string>;

    constructor (
        public name: string
    ) { }

    public setDependencies (dependencies: Array<DependencyInfo>) {
        this.dependencies = dependencies;
    }

    public setImplements (implementsTypes: Array<string>) {
        this.implements = implementsTypes;
    }
}
