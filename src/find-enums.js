// Dependencies:
import typescript from 'typescript';
import { EnumInfo } from './models/enum-info';
import { isNodeExported } from './utilities/utilities';

export function findEnums (sourceFile) {
    let enums = [];
    typescript.forEachChild(sourceFile, child => visit(child));
    return enums;

    function visit (node) {
        if (!isNodeExported(node)) {
            return;
        }

        if (node.kind === typescript.SyntaxKind.ModuleDeclaration) {
            typescript.forEachChild(node, child => visit(child));
        }

        if (node.kind === typescript.SyntaxKind.EnumDeclaration) {
            enums.push(new EnumInfo(node));
            return;
        }
    }
}
