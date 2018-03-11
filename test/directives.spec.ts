// Dependencies:
import { ClassTypeEnum, DirectiveInfo } from '../src';
import { create, expect } from './test-setup';

describe('banana-generator - directives:', () => {
    it('should correctly parse information about directives', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/directives/default/*.ts' });
        let [directiveFile] = Object.values(result);
        let [testDirective] = directiveFile.classes as Array<DirectiveInfo>;

        expect(testDirective.name).to.equal('TestDirective');
        expect(testDirective.classType).to.equal(ClassTypeEnum.directive);
        expect(testDirective.selector).to.equal('test');
    });

    it('should correctly parse information about directives with multiple selectors', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/directives/multiple-selectors/*.ts' });
        let [directiveFile] = Object.values(result);
        let [testDirective] = directiveFile.classes as Array<DirectiveInfo>;

        expect(testDirective.selector).to.equal('test');
        expect(testDirective.selectors).to.deep.equal(['test', 'test-test', '[testAttribute]']);
    });

    it('should correctly parse information about directives that implement interfaces', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/directives/implements/*.ts' });
        let [directiveFile] = Object.values(result);
        let [testDirective] = directiveFile.classes as Array<DirectiveInfo>;

        expect(testDirective.implements).to.deep.equal(['OnInit']);
    });

    it('should correctly parse information about directives that have inputs', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/directives/input/*.ts' });
        let [directiveFile] = Object.values(result);
        let [testDirective] = directiveFile.classes as Array<DirectiveInfo>;

        let [input] = testDirective.inputs;
        expect(input.name).to.equal('input');
        expect(input.twoWay).to.equal(false);
        expect(input.type).to.equal('boolean');
    });

    it('should correctly parse information about directives that have renamed inputs', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/directives/renamed-input/*.ts' });
        let [directiveFile] = Object.values(result);
        let [testDirective] = directiveFile.classes as Array<DirectiveInfo>;

        let [input] = testDirective.inputs;
        expect(input.name).to.equal('renamed');
        expect(input.twoWay).to.equal(false);
        expect(input.type).to.equal('string');
    });

    it('should correctly parse information about directives that have outputs', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/directives/output/*.ts' });
        let [directiveFile] = Object.values(result);
        let [testDirective] = directiveFile.classes as Array<DirectiveInfo>;

        let [output] = testDirective.outputs;
        expect(output.name).to.equal('output');
        expect(output.twoWay).to.equal(false);
        expect(output.type).to.equal('boolean');
    });

    it('should correctly parse information about directives that have renamed outputs', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/directives/renamed-output/*.ts' });
        let [directiveFile] = Object.values(result);
        let [testDirective] = directiveFile.classes as Array<DirectiveInfo>;

        let [output] = testDirective.outputs;
        expect(output.name).to.equal('renamed');
        expect(output.twoWay).to.equal(false);
        expect(output.type).to.equal('string');
    });

    it('should correctly parse information about directives that have two-way bindings', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/directives/two-way/*.ts' });
        let [directiveFile] = Object.values(result);
        let [testDirective] = directiveFile.classes as Array<DirectiveInfo>;

        let [input] = testDirective.inputs;
        expect(input.twoWay).to.equal(true);
        let [output] = testDirective.outputs;
        expect(output.twoWay).to.equal(true);
    });

    it('should correctly parse information about directives that depend on other directives', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/directives/dependency/*.ts' });
        let [, directiveFile] = Object.values(result);
        let [testDirective] = directiveFile.classes as Array<DirectiveInfo>;

        let [dependency] = testDirective.dependencies;
        let [injectedDirective] = testDirective.injectedDirectives;

        expect(dependency.name).to.equal('OtherDirective');
        expect(dependency.optional).to.equal(false);
        expect(injectedDirective.name).to.equal('OtherDirective');
        expect(injectedDirective.optional).to.equal(false);
    });

    it('should correctly parse information about directives that optionally depend on other directives', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/directives/optional-dependency/*.ts' });
        let [otherDirectiveFile, directiveFile] = Object.values(result);
        let [otherDirective] = otherDirectiveFile.classes as Array<DirectiveInfo>;
        let [testDirective] = directiveFile.classes as Array<DirectiveInfo>;

        let [canAffect] = otherDirective.canAffect;
        expect(canAffect).to.equal(testDirective);

        let [dependency] = testDirective.dependencies;
        let [injectedDirective] = testDirective.injectedDirectives;

        expect(dependency.name).to.equal('OtherDirective');
        expect(dependency.optional).to.equal(true);
        expect(injectedDirective.name).to.equal('OtherDirective');
        expect(injectedDirective.optional).to.equal(true);
    });
});
