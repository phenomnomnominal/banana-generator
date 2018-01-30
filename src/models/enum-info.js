// Dependencies:
import { getChecker } from '../get-checker';
import { findMembers } from '../utilities/utilities';

export class EnumInfo {
    constructor (node) {
        let checker = getChecker();
        let symbol = checker.getSymbolAtLocation(node.name);
        let members = findMembers(symbol);

        this.name = symbol.name;

        this.values = findValues(members);
    }
}

function findValues (members) {
    return members.map(member => member.name.text);
}
