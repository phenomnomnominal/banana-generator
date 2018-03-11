// Dependencies:
import { Injectable } from 'injection-js';
import { ClassElement, Decorator, NewExpression, PropertyDeclaration, TypeChecker, TypeReferenceNode } from 'typescript';
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
        outputInfo.setType(this._findType(member as PropertyDeclaration));
        return outputInfo;
    }

    private _findType (member: PropertyDeclaration): string {
        let type = (this._checker.getTypeOfSymbolAtLocation((member as any).symbol, member) as any).intrinsicName as string;
        if (type === 'unknown') {
            if (member.initializer) {
                let { typeArguments } = member.initializer as NewExpression;
                if (typeArguments && typeArguments.length > 0) {
                    let [eventEmitterType] = typeArguments;
                    return (eventEmitterType as any).intrinsicName;
                }
            }
            if (member.type) {
                return (member.type as TypeReferenceNode).typeName.getText();
            }
        }
        return type;
    }
}
