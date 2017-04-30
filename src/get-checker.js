// Dependencies:
import typescript from 'typescript';

let checker = null;
export function getChecker () {
    if (!checker) {
        let options = { };
        let host = typescript.createCompilerHost(options);
        let program = typescript.createProgram([], options, host);
        checker = program.getTypeChecker();
    }
    return checker;
}
