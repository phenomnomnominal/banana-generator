// Dependencies:
import * as cheerio from 'cheerio';
import { Injectable } from 'injection-js';
import * as path from 'path';
import { CallExpression, Decorator, ObjectLiteralExpression } from 'typescript';
import { ASTHelper, FileReader } from '../../../../utilities';
import { ContentInfo } from './content-info';

@Injectable()
export class ContentParser {
    constructor (
        private _astHelper: ASTHelper,
        private _fileReader: FileReader
    ) { }

    public findContent (component: Decorator) {
        let template = this._findTemplate(component);
        let $ = cheerio.load(template);
        return Array.from($('ng-content')).map(element => new ContentInfo(element.attribs));
    }

    private _findTemplate (component: Decorator) {
        let decorator = component;
        let { fileName } = decorator.getSourceFile();

        let properties = this._astHelper.findDecoratorProperties(decorator);
        let templateProperty = this._astHelper.findProperty(properties, 'template');
        let templateUrlProperty = this._astHelper.findProperty(properties, 'templateUrl');

        if (templateProperty) {
            return templateProperty.initializer.getText();
        }
        if (templateUrlProperty) {
            let relativeTemplatePath = templateUrlProperty.initializer.getText().replace(/'/g, '');
            let templatePath = path.resolve(path.dirname(fileName), relativeTemplatePath);
            return this._fileReader.readFile(templatePath);
        }

        throw new Error(`Could not find "template" at "${fileName}"`);
    }
}
