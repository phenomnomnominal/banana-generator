// Dependencies:
import { getChecker } from '../get-checker';

export class InputInfo {
    constructor (member) {
        this.name = member.name.text;
        this.type = getType(member);
        this.twoWay = false;
    }
}

function getType (member) {
    let checker = getChecker();
    let type = checker.getTypeOfSymbolAtLocation(member.symbol, member).intrinsicName;
    if (type === 'unknown') {
        type = member.type.typeName.text;
    }
    return type;
}
