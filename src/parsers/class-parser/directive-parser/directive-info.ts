// Dependencies:
import { ClassInfo } from '../class-info';
import { DependencyInfo } from '../dependency-info';
import { InputInfo } from './input-parser';
import { OutputInfo } from './output-parser';

export class DirectiveInfo extends ClassInfo {
    public selectors: Array<string>;
    public selector: string;

    public canAffect: Array<ClassInfo> = [];

    public inputs: Array<InputInfo> = [];
    public module?: ClassInfo;
    public outputs: Array<OutputInfo> = [];

    public injectedComponents: Array<DependencyInfo> = [];
    public injectedDirectives: Array<DependencyInfo> = [];

    public setInputs (inputs: Array<InputInfo>): void {
        this.inputs = inputs;
    }

    public setOutputs (outputs: Array<OutputInfo>): void {
        this.outputs = outputs;
    }

    public setSelector (selector: Array<string>): void {
        this.selectors = selector;
        [this.selector] = this.selectors;
    }
}
