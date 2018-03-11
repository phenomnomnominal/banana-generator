// Dependencies:
import { Injectable } from 'injection-js';
import { createCompilerHost, createProgram, TypeChecker } from 'typescript';

@Injectable()
export class TypeHelper {
    private _checker: TypeChecker;

    public getChecker (): TypeChecker {
        if (!this._checker) {
            let options = { };
            let host = createCompilerHost(options);
            let program = createProgram([], options, host);
            this._checker = program.getTypeChecker();
        }
        return this._checker;
    }
}
