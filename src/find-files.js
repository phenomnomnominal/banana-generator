// Dependencies:
import glob from 'glob';
import typescript from 'typescript';

export function findFiles (pattern) {
    let files = glob.sync(pattern);

    return files.map(file => {
        let content = readFile(file);
        let sourceFile = typescript.createSourceFile(file, content, null, true);
        typescript.bindSourceFile(sourceFile, {});
        return sourceFile;
    });
}

export function readFile (path) {
    return typescript.sys.readFile(path);
}
