// Utilities:
import glob from 'glob';

// Dependencies:
import typescript from 'typescript';

export function findFiles (pattern) {
    let files = glob.sync(pattern);

    return files.map(file => {
        let content = typescript.sys.readFile(file);
        let sourceFile = typescript.createSourceFile(file, content, null, true);
        typescript.bindSourceFile(sourceFile, {});
        return sourceFile;
    });
}
