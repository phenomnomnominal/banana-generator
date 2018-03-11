// Dependencies:
import { ClassInfo } from '../class-info';
import { ClassTypeEnum } from '../class-type.enum';
import { DependencyInfo } from '../dependency-info';
import { InputInfo } from './input-parser';
import { OutputInfo } from './output-parser';

export class DirectiveInfo extends ClassInfo {
    public canAffect: Array<ClassInfo> = [];
    public classType = ClassTypeEnum.directive;
    public injectedComponents: Array<DependencyInfo> = [];
    public injectedDirectives: Array<DependencyInfo> = [];
    public inputs: Array<InputInfo> = [];
    public module?: ClassInfo;
    public outputs: Array<OutputInfo> = [];
    public selectors: Array<string>;
    public selector: string;

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
