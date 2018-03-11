// Dependencies:
import { Injectable } from 'injection-js';
import { ArrayLiteralExpression, CallExpression, Decorator } from 'typescript';
import { ASTHelper } from '../../../utilities';
import { ModuleInfo } from './module-info';

@Injectable()
export class ModuleParser {
    constructor (
        private _astHelper: ASTHelper
    ) { }

    public parseModule (name: string, decorator: Decorator): ModuleInfo {
        let moduleInfo = new ModuleInfo(name);
        moduleInfo.setDeclarations(this._findDeclarations(decorator));
        return moduleInfo;
    }

    private _findDeclarations (module: Decorator) {
        let properties = this._astHelper.findDecoratorProperties(module);
        let declarations = this._astHelper.findProperty(properties, 'declarations');
        if (!declarations) {
            return [];
        }

        return (declarations.initializer as ArrayLiteralExpression).elements.map(element => {
            return element.getText();
        });
    }
}
