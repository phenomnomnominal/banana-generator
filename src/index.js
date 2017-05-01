// Utilities:
import fs from 'fs-extra';
import { error, info } from './utilities/logger';

// Dependencies:
import { findClasses } from './find-classes';
import { findEnums } from './find-enums';
import { findFiles } from './find-files';

export function banana (options) {
    info('Generating component info...');

    let results = {};

    let files = findFiles(options.in);
    files.forEach(file => {
        try {
            let classes = findClasses(file);
            let enums = findEnums(file);
            if (classes.length || enums.length) {
                results[file.fileName] = { classes, enums };
            }
        } catch (e) {
            error(`Oops! Error in "${file.fileName}":`);
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
