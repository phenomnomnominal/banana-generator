// Dependencies:
import { Injectable } from 'injection-js';
import { ArrayLiteralExpression, CallExpression, ClassElement, Decorator } from 'typescript';
import { ASTHelper } from '../../../utilities';
import { DirectiveParser, InputParser, OutputParser } from '../directive-parser';
import { ComponentInfo } from './component-info';
import { ContentParser } from './content-parser';

@Injectable()
export class ComponentParser extends DirectiveParser {
    constructor (
        private _contentParser: ContentParser,
        astHelper: ASTHelper,
        inputParser: InputParser,
        outputParser: OutputParser
    ) {
        super(astHelper, inputParser, outputParser);
    }

    public parseComponent (name: string, component: Decorator, members: Array<ClassElement>): ComponentInfo {
        let componentInfo = new ComponentInfo(name);
        componentInfo.setContent(this._contentParser.findContent(component));
        componentInfo.setSelector(this.findSelector(component));
        componentInfo.setInputs(this.findInputs(members));
        componentInfo.setOutputs(this.findOutputs(members));
        this.findTwoWays(componentInfo.inputs, componentInfo.outputs);
        return componentInfo;
    }
}
