// Dependencies:
import { Injectable } from 'injection-js';
import { ArrayLiteralExpression, CallExpression, ClassElement, Decorator } from 'typescript';
import { ASTHelper } from '../../../utilities/ast-helper';
import { DirectiveInfo } from './directive-info';
import { InputInfo, InputParser } from './input-parser';
import { OutputInfo, OutputParser } from './output-parser';

@Injectable()
export class DirectiveParser {
    constructor (
        private _astHelper: ASTHelper,
        private _inputParser: InputParser,
        private _outputParser: OutputParser
    ) { }

    public parseDirective (name: string, directive: Decorator, members: Array<ClassElement>): DirectiveInfo {
        let directiveInfo = new DirectiveInfo(name);
        directiveInfo.setSelector(this.findSelector(directive));
        directiveInfo.setInputs(this.findInputs(members));
        directiveInfo.setOutputs(this.findOutputs(members));
        this.findTwoWays(directiveInfo.inputs, directiveInfo.outputs);
        return directiveInfo;
    }

    protected findSelector (directive: Decorator): Array<string> {
        let { fileName } = directive.getSourceFile();

        let properties = this._astHelper.findDecoratorProperties(directive);
        let selector = this._astHelper.findProperty(properties, 'selector');
        if (!selector) {
            throw new Error(`Could not find "selector" at "${fileName}"`);
        }
        let selectors = selector.initializer.getText();
        return selectors.split(',')
            .map(s => s.replace(/\[|\]/g, ' '))
            .map(s => s.replace('  ', ' '))
            .map(s => s.trim());
    }

    protected findInputs (members: Array<ClassElement>): Array<InputInfo> {
        return members.map(member => {
            let input = this._astHelper.findDecorator(member.decorators || [], 'Input');
            return input ? this._inputParser.parseInput(input, member) : null;
        })
        .filter(Boolean) as Array<InputInfo>;
    }

    protected findOutputs (members: Array<ClassElement>): Array<OutputInfo> {
        return members.map(member => {
            let output = this._astHelper.findDecorator(member.decorators || [], 'Output');
            return output ? this._outputParser.parseOutput(output, member) : null;
        })
        .filter(Boolean) as Array<OutputInfo>;
    }

    protected findTwoWays (inputs: Array<InputInfo>, outputs: Array<OutputInfo>): void {
        outputs.forEach(output => {
            let input = inputs.find(input => output.name === `${input.name}Change`);
            if (input) {
                input.twoWay = true;
                output.twoWay = true;
            }
        });
    }
}
