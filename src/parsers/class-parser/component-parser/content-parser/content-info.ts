// Dependencies:
import * as cheerio from 'cheerio';

export class ContentInfo {
    public name: string;
    public isDefault: boolean;

    constructor (
        attributes: { [attr: string]: string }
    ) {
        this.name = attributes.select;
        this.isDefault = !this.name;
    }
}
