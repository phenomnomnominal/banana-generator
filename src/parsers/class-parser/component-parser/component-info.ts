// Dependencies:
import { ClassTypeEnum } from '../class-type.enum';
import { DirectiveInfo } from '../directive-parser';
import { ContentInfo } from './content-parser';

export class ComponentInfo extends DirectiveInfo {
    public canContain: Array<ComponentInfo> = [];
    public classType = ClassTypeEnum.component;
    public content: Array<ContentInfo> = [];

    public setContent (content: Array<ContentInfo>): void {
        this.content = content;
    }
}
