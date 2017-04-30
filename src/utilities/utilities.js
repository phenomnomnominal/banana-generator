// Utilities:
import path from 'path';

// Dependencies:
import typescript from 'typescript';

export function findConstructor (members) {
    return members.find(member => member.kind === typescript.SyntaxKind.Constructor)
}

export function findDecorator (decorators, name) {
    let found = null;
    if (decorators && decorators.length) {
        found = decorators.find(decorator => {
            let decoratorName = decorator.expression.expression.text;
            return decoratorName === name;
        });
    }
    return found;
}

export function findDecorators (symbol) {
    let { declarations } = symbol;
    let [declaration] = declarations;
    let { decorators } = declaration;
    return decorators;
}

export function findMembers (symbol) {
    let [declaration] = symbol.declarations;
    let { members } = declaration;
    return members && members.length ? members : [];
}

export function findProperty (properties, name) {
    let found = null;
    if (properties && properties.length) {
        found = properties.find(property => {
            return property.name.text === name;
        });
    }
    return found;
}

export function getNodeFilePath (node) {
    return getFilePath(node.getSourceFile());
}

export function getFilePath (sourceFile) {
    return path.resolve(process.cwd(), sourceFile.fileName);
}

export function isNodeExported (node) {
    return (node.flags & typescript.NodeFlags.Export) !== 0 || (node.parent && node.parent.kind === typescript.SyntaxKind.SourceFile);
}
