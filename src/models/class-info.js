// Utilities:
import { error } from '../utilities/logger';
import { findConstructor, findDecorator, findDecorators, findMembers, findProperty, getNodeFilePath } from '../utilities/utilities';

// Dependencies:
import { getChecker } from '../get-checker';
import { DependencyInfo } from './dependency-info';
import { InputInfo } from './input-info';
import { OutputInfo } from './output-info';

export class ClassInfo {
    constructor (node) {
        let checker = getChecker();
        let symbol = checker.getSymbolAtLocation(node.name);
        let decorators = findDecorators(symbol);
        let members = findMembers(symbol);

        this.name = symbol.name;

        let component = findDecorator(decorators, 'Component');
        this.isComponent = !!component;

        let directive = findDecorator(decorators, 'Directive');
        this.isDirective = !!directive;

        if (this.isComponent || this.isDirective) {
            this.selector = findSelector(component, directive);
        }

        this.dependencies = findDependencies(members);
        this.inputs = findInputs(members);
        this.outputs = findOutputs(this.inputs, members);
    }
}

function findDependencies (members) {
    let cons = findConstructor(members);
    if (cons) {
        return cons.parameters.map(parameter => new DependencyInfo(parameter));
    }
    return [];
}

function findInputs (members) {
    let inputs = [];
    members.forEach(member => {
        let input = findDecorator(member.decorators, 'Input');
        if (input) {
            inputs.push(new InputInfo(member));
        }
    });
    return inputs;
}

function findOutputs (members) {
    let outputs = [];
    members.forEach(member => {
        let output = findDecorator(member.decorators, 'Output');
        if (output) {
            outputs.push(new OutputInfo(member));
        }
    });
    return outputs;
}

function findSelector (component, directive) {
    let decorator = component || directive;
    try {
        let [decoratorProperties] = decorator.expression.arguments;
        let selector = findProperty(decoratorProperties.properties, 'selector');
        return selector.initializer.text;
    } catch (e) {
        error(`Could not find "selector" at "${getNodeFilePath(decorator)}"`);
    }
}
