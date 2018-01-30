// Dependencies:
import { error } from '../utilities/logger';
import { findConstructor, findDecorator } from '../utilities/utilities';

export function findDependencies (members) {
    let cons = findConstructor(members);
    if (cons) {
        return cons.parameters.map(parameter => new DependencyInfo(parameter));
    }
    return [];
}


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
