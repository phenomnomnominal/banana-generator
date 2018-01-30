// Dependencies:
import fs from 'fs-extra';
import { error, info } from './utilities/logger';
import { findClasses } from './find-classes';
import { findEnums } from './find-enums';
import { findFiles } from './find-files';
import { findRelationships } from './find-relationships';

export function banana (options) {
    info('Generating component info...');

    let results = {};

    let files = findFiles(options.in);
    files.forEach(file => {
        try {
            let classes = findClasses(file);
            let enums = findEnums(file);
            let result = {};
            if (classes.length) {
                result.classes = classes;
            }
            if (enums.length) {
                result.enums = enums;
            }
            if (Object.keys(result).length) {
                results[file.fileName] = result;
            }
        } catch (e) {
            error(`Oops! Error in "${file.fileName}":`);
            error(e.message);
        }
    });

    results = findRelationships(results);

    info('Done!');

    if (options.out) {
        info(`Writing to "${options.out}"...`)

        fs.ensureFileSync(options.out);
        fs.writeFileSync(options.out, JSON.stringify(results));
    } else {
        return results;
    }
}
