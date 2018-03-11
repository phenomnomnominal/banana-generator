// Dependencies:
import { ClassInfo } from '../class-parser';
import { EnumInfo } from '../enum-parser';

export class FileInfo {
    public classes: Array<ClassInfo>;
    public enums: Array<EnumInfo>;

    constructor (
        public fileName: string,
        classes: Array<ClassInfo>,
        enums: Array<EnumInfo>
    ) {
        if (classes.length) {
            this.classes = classes;
        }
        if (enums.length) {
            this.enums = enums;
        }
    }
}
