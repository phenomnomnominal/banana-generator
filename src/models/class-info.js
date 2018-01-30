// Utilities:
import { error } from '../utilities/logger';
import { findDecorator, findDecorators, findMembers, findProperty } from '../utilities/utilities';

// Dependencies:
import { getChecker } from '../get-checker';
import { findContent } from './content-info';
import { findDependencies } from './dependency-info';
import { findInputs } from './input-info';
import { findOutputs } from './output-info';

export class ClassInfo {
    constructor (node) {
        let checker = getChecker();
        let symbol = checker.getSymbolAtLocation(node.name);
        let decorators = findDecorators(symbol);
        let members = findMembers(symbol);

        this.name = symbol.name;

        let component = findDecorator(decorators, 'Component');
        this.isComponent = !!component;
        if (this.isComponent) {
            this.content = findContent(component);
        }

        let directive = findDecorator(decorators, 'Directive');
        this.isDirective = !!directive;

        let module = findDecorator(decorators, 'NgModule');
        this.isModule = !!module;

        if (this.isComponent || this.isDirective) {
            this.selector = findSelector(component, directive);
        }

        this.implements = findImplements(symbol);
        this.dependencies = findDependencies(members);
        this.inputs = findInputs(members);
        this.outputs = findOutputs(this.inputs, members);
    }
}

function findImplements (symbol) {
    let { declarations } = symbol;
    let [declaration] = declarations;
    let { heritageClauses } = declaration;
    if (heritageClauses) {
        let [heritage] = heritageClauses;
        return heritage.types.map(type => type.expression.text);
    }
    return [];
}

function findSelector (component, directive) {
    let decorator = component || directive;
    try {
        let [decoratorProperties] = decorator.expression.arguments;
        let selector = findProperty(decoratorProperties.properties, 'selector');
        return selector.initializer.text;
    } catch (e) {
        let { fileName } = decorator.getSourceFile();
        error(`Could not find "selector" at "${fileName}"`);
    }
}
