// Dependencies:
import { Injectable } from 'injection-js';
import { EnumDeclaration, forEachChild, Node, SourceFile, SyntaxKind, TypeChecker } from 'typescript';
import { ASTHelper, TypeHelper } from '../../utilities';
import { EnumInfo } from './enum-info';

@Injectable()
export class EnumParser {
    private _checker: TypeChecker;

    constructor (
        private _astHelper: ASTHelper,
        _typeHelper: TypeHelper
    ) {
        this._checker = _typeHelper.getChecker();
    }

    public findEnums (sourceFile: SourceFile): Array<EnumInfo> {
        let enums: Array<EnumInfo> = [];
        forEachChild(sourceFile, child => this._visit(enums, child));
        return enums;
    }

    private _visit (enums: Array<EnumInfo>, node: Node) {
        if (!this._astHelper.isNodeExported(node)) {
            return;
        }

        const { kind } = node;

        if (kind === SyntaxKind.ModuleDeclaration) {
            forEachChild(node, child => this._visit(enums, child));
        }

        if (kind === SyntaxKind.EnumDeclaration) {
            enums.push(this._getEnumInfo(node as EnumDeclaration));
        }
    }

    private _getEnumInfo (node: EnumDeclaration): EnumInfo {
        let ast = this._astHelper;
        let symbol = this._checker.getSymbolAtLocation(node.name);
        let { name } = symbol;

        let enumInfo = new EnumInfo(name);
        enumInfo.setValues(ast.findValues(ast.findMembers(symbol)));
        return enumInfo;
    }
}
