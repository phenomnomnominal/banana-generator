// Dependencies:
import { ClassInfo } from '../class-info';

export class ModuleInfo extends ClassInfo {
    public declarations: Array<string>;

    public setDeclarations (declarations: Array<string>) {
        this.declarations = declarations;
    }
}
