// Dependencies:
import { DirectiveInfo } from '../directive-parser';
import { ContentInfo } from './content-parser';

export class ComponentInfo extends DirectiveInfo {
    public canContain: Array<ComponentInfo> = [];
    public content?: Array<ContentInfo>;

    public setContent (content: Array<ContentInfo>): void {
        this.content = content;
    }
}
