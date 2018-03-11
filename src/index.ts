// Dependencies:
import { ReflectiveInjector } from 'injection-js';
import 'reflect-metadata';

// API:
import { Banana } from './banana/banana';
import { ClassParser, ComponentParser, ContentParser, DirectiveParser, EnumParser, FileInfo, FileParser, InputParser, ModuleParser, OutputParser } from './parsers';
import { ASTHelper, FileLinker, FileReader, Logger, LoggerOptions, TypeHelper } from './utilities';

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
export const banana = bananaInstance.banana.bind(bananaInstance);
