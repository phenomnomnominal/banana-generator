// Utilities:
import fs from 'fs-extra';
import { error, info } from './utilities/logger';
import { getFilePath } from './utilities/utilities';

// Dependencies:
import { findClasses } from './find-classes';
import { findEnums } from './find-enums';
import { findFiles } from './find-files';

export function banana (options) {
    info('Generating component info...');

    let results = {};

    let files = findFiles(options.in);
    files.forEach(file => {
        let filePath = getFilePath(file);
        try {
            let classes = findClasses(file);
            let enums = findEnums(file);
            if (classes.length || enums.length) {
                results[filePath] = { classes, enums };
            }
        } catch (e) {
            error(`Oops! Error in "${filePath}":`);
            error(e.message);
        }
    });

    info('Done!');

    if (options.out) {
        info(`Writing to "${options.out}"...`)

        fs.ensureFileSync(options.out);
        fs.writeFileSync(options.out, JSON.stringify(results));
    } else {
        return results;
    }
}
