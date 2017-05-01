// Utilities:
import { error } from '../utilities/logger';
import { findDecorator } from '../utilities/utilities';

export class DependencyInfo {
    constructor (parameter) {
        let { decorators, type } = parameter;
        let instanceName = parameter.name.text;

        try {
            this.name = type.typeName.text;
        } catch (e) {
            let { fileName } = parameter.getSourceFile();
            error(`Could not find type of dependency "${instanceName}" at "${fileName}"`);
        }
        this.optional = !!findDecorator(decorators, 'Optional');
    }
}
