// Utilities:
import { error } from '../utilities/logger';
import { findDecorator, getNodeFilePath } from '../utilities/utilities';

export class DependencyInfo {
    constructor (parameter) {
        let { decorators, type } = parameter;
        let instanceName = parameter.name.text;

        try {
            this.name = type.typeName.text;
        } catch (e) {
            error(`Could not find type of dependency "${instanceName}" at "${getNodeFilePath(parameter)}"`);
        }
        this.optional = !!findDecorator(decorators, 'Optional');
    }
}
