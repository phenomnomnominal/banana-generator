// Dependencies:
import * as fs from 'fs-extra';
import * as glob from 'glob';
import { Injectable } from 'injection-js';
import * as typescript from 'typescript';
import { createSourceFile, ScriptTarget } from 'typescript';

@Injectable()
export class FileReader {
    public async readFiles (pattern: string) {
        let files = glob.sync(pattern);

        return Promise.all(files.map(file => {
            let content = this.readFile(file);
            let sourceFile = createSourceFile(file, content, ScriptTarget.ES5, true);
            (<any>typescript).bindSourceFile(sourceFile, {});
            return sourceFile;
        }));
    }

    public readFile (path: string) {
        return fs.readFileSync(path, 'utf-8');
    }
}
