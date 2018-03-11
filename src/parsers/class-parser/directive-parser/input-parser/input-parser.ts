// Dependencies:
import { Injectable } from 'injection-js';
import { ClassElement, Decorator, TypeChecker } from 'typescript';
import { ASTHelper, TypeHelper } from '../../../../utilities';
import { InputInfo } from './input-info';

@Injectable()
export class InputParser {
    private _checker: TypeChecker;

    constructor (
        private _astHelper: ASTHelper,
        typeHelper: TypeHelper
    ) {
        this._checker = typeHelper.getChecker();
    }

    public parseInput (input: Decorator, member: ClassElement): InputInfo {
        let inputInfo = new InputInfo(input, member);
        inputInfo.setType(this._findType(member));
        return inputInfo;
    }

    private _findType (member: ClassElement): string {
        let type = (this._checker.getTypeOfSymbolAtLocation((member as any).symbol, member) as any).intrinsicName as string;
        if (type === 'unknown') {
            type = (member as any).type.typeName.text;
        }
        return type;
    }
}
