// Dependencies:
import { ClassInfo } from '../class-info';
import { ClassTypeEnum } from '../class-type.enum';

export class ModuleInfo extends ClassInfo {
    public classType = ClassTypeEnum.module;
    public declarations: Array<string>;

    public setDeclarations (declarations: Array<string>) {
        this.declarations = declarations;
    }
}
