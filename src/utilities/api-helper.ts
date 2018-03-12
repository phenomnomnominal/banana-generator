// Dependencies:
import { BananaResults } from '../banana';
import { ClassInfo, EnumInfo, FileInfo } from '../parsers';

export function findClasses (api: BananaResults, name?: string): Array<ClassInfo> {
    return findClassesFromFiles(Object.values(api));
}

export function findClassesFromFiles (files: Array<FileInfo>, name?: string): Array<ClassInfo> {
    return files.reduce((previous: Array<ClassInfo>, next) => {
        return previous.concat(next.classes.filter(classInfo => {
            return name ? classInfo.name === name : classInfo;
        }));
    }, []);
}

export function findEnum (api: BananaResults, name?: string): Array<EnumInfo> {
    return findEnumsFromFiles(Object.values(api), name);
}

export function findEnumsFromFiles (files: Array<FileInfo>, name?: string): Array<EnumInfo> {
    return files.reduce((previous: Array<EnumInfo>, next) => {
        return previous.concat(next.enums.filter(enumInfo => {
            return name ? enumInfo.name === name : enumInfo;
        }));
    }, []);
}
