// Dependencies:
import { ineeda } from 'ineeda';
import { ClassProvider, ExistingProvider, FactoryProvider, ReflectiveInjector, ValueProvider } from 'injection-js';
import 'reflect-metadata';
import * as sinon from 'sinon';
import { Banana } from '../src/banana';
import { ClassParser, ComponentParser, ContentParser, DirectiveParser, EnumParser, FileInfo, FileParser, InputParser, ModuleParser, OutputParser } from '../src/parsers';
import { ASTHelper, FileLinker, FileReader, Logger, LoggerOptions, TypeHelper } from '../src/utilities';

const INJECTABLES = [
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
    { provide: Logger, useFactory: ineeda.factory<Logger>() },
    ModuleParser,
    OutputParser,
    TypeHelper
];

/* tslint:disable */
export const NOOP = () => {};
/* tslint:enable */

// Intercept all values that are functions and turn it into a stub:
ineeda.intercept((value: any, key: string, values: any, target: any) => {
    if (value instanceof Function) {
        target[key] = NOOP;
        return sinon.stub(target, key).callsFake(values[key]);
    }
    return value;
});

export { expect } from 'chai';
export type Provider = ClassProvider | ExistingProvider | FactoryProvider | ValueProvider;

export function create (providers: Array<Provider> = []): typeof Banana.prototype.banana {
    let injectables = INJECTABLES.map(injectable => {
        return providers.find((provider: Provider) => provider.provide === injectable) || injectable;
    });

    const injector = ReflectiveInjector.resolveAndCreate(injectables);
    let bananaInstance = injector.get(Banana);
    return bananaInstance.banana.bind(bananaInstance);
}
