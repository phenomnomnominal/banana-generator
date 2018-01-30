// Dependencies:
import typescript from 'typescript';
import { ClassInfo } from './models/class-info';
import { isNodeExported } from './utilities/utilities';

export function findClasses (sourceFile) {
    let classes = [];
    typescript.forEachChild(sourceFile, child => visit(child));
    return classes;

    function visit (node) {
        if (!isNodeExported(node)) {
            return;
        }

        if (node.kind === typescript.SyntaxKind.ModuleDeclaration) {
            typescript.forEachChild(node, child => visit(child));
        }

        if (node.kind === typescript.SyntaxKind.ClassDeclaration) {
            let classInfo = new ClassInfo(node);
            classes.push(classInfo);
            return;
        }
    }
}
