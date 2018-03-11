// Dependencies:
import { Injectable } from 'injection-js';
import { SourceFile } from 'typescript';
import { Logger } from '../../utilities';
import { ClassParser } from '../class-parser';
import { EnumParser } from '../enum-parser';
import { FileInfo } from './file-info';

@Injectable()
export class FileParser {
    constructor (
        private _classParser: ClassParser,
        private _enumParser: EnumParser,
        private _logger: Logger
    ) { }

    public parseFile (sourceFile: SourceFile): FileInfo | null {
        try {
            let classes = this._classParser.findClasses(sourceFile);
            let enums = this._enumParser.findEnums(sourceFile);
            let file = new FileInfo(sourceFile.fileName, classes, enums);
            if (file.classes || file.enums) {
                return file;
            }
        } catch (error) {
            this._logger.error(`Oops! Error in "${sourceFile.fileName}":`);
            this._logger.error(error.message);
        }
        return null;
    }
}
