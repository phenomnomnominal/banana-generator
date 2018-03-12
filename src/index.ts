// Dependencies:
import { ReflectiveInjector } from 'injection-js';
import 'reflect-metadata';
import { Banana } from './banana';
import { ClassParser, ComponentParser, ContentParser, DirectiveParser, EnumParser, FileInfo, FileParser, InputParser, ModuleParser, OutputParser } from './parsers';
import { ASTHelper, FileLinker, FileReader, Logger, LoggerOptions, TypeHelper } from './utilities';

export * from './banana';
export * from './parsers';
export * from './utilities';

let injector = ReflectiveInjector.resolveAndCreate([
    ASTHelper,
    Banana,
    ClassParser,
    ComponentParser,
    ContentParser,
    DirectiveParser,
    EnumParser,
    FileLinker,
    FileParser,
    FileReader,
    InputParser,
    Logger,
    {
        provide: LoggerOptions, useValue: {
            errorStyle: {
                fg: 'red'
            },
            heading: '🍌  banana',
            headingStyle: {
                bg: 'black',
                fg: 'green'
            },
            infoStyle: {
                fg: 'blue'
            },
            warnStyle: {
                fg: 'yellow'
            }
        }
    },
    ModuleParser,
    OutputParser,
    TypeHelper
]);

const bananaInstance: Banana = injector.get(Banana) as Banana;
export const banana: typeof Banana.prototype.banana = bananaInstance.banana.bind(bananaInstance);
