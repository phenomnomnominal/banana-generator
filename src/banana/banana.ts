// Dependencies:
import * as fs from 'fs-extra';
import { Injectable } from 'injection-js';
import * as path from 'path';
import { FileInfo, FileParser } from '../parsers';
import { FileLinker, FileReader, Logger } from '../utilities';
import { BananaOptions } from './options';
import { BananaResults } from './results';

@Injectable()
export class Banana {
    constructor (
        private _fileLinker: FileLinker,
        private _fileParser: FileParser,
        private _fileReader: FileReader,
        private _logger: Logger
    ) { }

    public async banana (options: BananaOptions): Promise<BananaResults> {
        this._logger.info('Generating component info...');

        let sourceFiles = await this._fileReader.readFiles(options.in);
        let files = sourceFiles
            .map(sourceFile => this._fileParser.parseFile(sourceFile))
            .filter(file => file != null) as Array<FileInfo>;

        this._fileLinker.linkFiles(files);

        let results: BananaResults = {};
        files.forEach(file => results[file.fileName] = file);

        this._logger.info('Done!');

        if (options.out) {
            let outPath = path.resolve(process.cwd(), options.out);

            this._logger.info(`Writing to "${outPath}"...`);

            await fs.ensureFile(outPath);
            await fs.writeFile(outPath, JSON.stringify(results));
        }
        return results;
    }
}
