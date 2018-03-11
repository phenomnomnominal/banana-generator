// Dependencies:
import { Injectable } from 'injection-js';
import { ClassElement, Decorator, TypeChecker } from 'typescript';
import { ASTHelper, TypeHelper } from '../../../../utilities';
import { OutputInfo } from './output-info';

@Injectable()
export class OutputParser {
    private _checker: TypeChecker;

    constructor (
        private _astHelper: ASTHelper,
        typeHelper: TypeHelper
    ) {
        this._checker = typeHelper.getChecker();
    }

    public parseOutput (output: Decorator, member: ClassElement): OutputInfo {
        let outputInfo = new OutputInfo(output, member);
        outputInfo.setType(this._findType(member));
        return outputInfo;
    }

    private _findType (member: ClassElement): string {
        let type = (this._checker.getTypeOfSymbolAtLocation((member as any).symbol, member) as any).intrinsicName as string;
        if (type === 'unknown') {
            type = (member as any).type.typeName.text;
        }
        return type;
    }
}
