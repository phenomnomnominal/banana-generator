// Dependencies:
import cheerio from 'cheerio';
import path from 'path';
import { readFile } from '../find-files';
import { error } from '../utilities/logger';
import { findProperty } from '../utilities/utilities';

export function findContent (component) {
    let template = findTemplate(component);
    let $ = cheerio.load(template);
    return Array.from($('ng-content')).map(a => new ContentInfo(a.attribs));
}

export class ContentInfo {
    constructor (attributes) {
        this.name = attributes.select;
        this.isDefault = !this.name;
    }
}

function findTemplate (component) {
    let decorator = component;
    try {
        let [decoratorProperties] = decorator.expression.arguments;
        let selector = findProperty(decoratorProperties.properties, 'template');
        return selector.initializer.text;
    } catch (e) {
        let { fileName } = decorator.getSourceFile();
        try {
            let [decoratorProperties] = decorator.expression.arguments;
            let selector = findProperty(decoratorProperties.properties, 'templateUrl');
            let templateUrl = selector.initializer.text;
            let templatePath = path.resolve(path.dirname(fileName), templateUrl)
            return readFile(templatePath);
        } catch (e) {
            error(`Could not find "template" at "${fileName}"`);
        }
    }
}
