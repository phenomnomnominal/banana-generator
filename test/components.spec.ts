// Dependencies:
import { ClassTypeEnum, ComponentInfo, DirectiveInfo } from '../src';
import { create, expect } from './test-setup';

describe('banana-generator - components:', () => {
    it('should correctly parse information about components', () => {
        let banana = create();

        let result = banana({ in: './test/fixtures/components/default/*.ts' });
        let [componentFile] = Object.values(result);
        let [testComponent] = componentFile.classes as Array<ComponentInfo>;

        expect(testComponent.name).to.equal('TestComponent');
        expect(testComponent.classType).to.equal(ClassTypeEnum.component);
    });

    it('should correctly parse information about components with external templates', () => {
        let banana = create();

        let result = banana({ in: './test/fixtures/components/external-template/*.ts' });
        let [componentFile] = Object.values(result);
        let [testComponent] = componentFile.classes as Array<ComponentInfo>;
        let [content] = testComponent.content;

        expect(content.isDefault).to.equal(true);
    });

    it('should correctly parse information about components with multiple content slots', () => {
        let banana = create();

        let result = banana({ in: './test/fixtures/components/multiple-content-slots/*.ts' });
        let [componentFile] = Object.values(result);
        let [testComponent] = componentFile.classes as Array<ComponentInfo>;
        let [content, content2] = testComponent.content;

        expect(content.isDefault).to.equal(true);
        expect(content2.isDefault).to.equal(false);
        expect(content2.name).to.equal('content');
    });

    it('should correctly parse information about components that depend on directives', () => {
        let banana = create();

        let result = banana({ in: './test/fixtures/components/directive-dependency/*.ts' });
        let [componentFile, testDirectiveFile] = Object.values(result);
        let [testDirective] = testDirectiveFile.classes as Array<DirectiveInfo>;
        let [testComponent] = componentFile.classes as Array<ComponentInfo>;

        let [canAffect] = testDirective.canAffect;
        expect(canAffect).to.equal(testComponent);

        let [dependency] = testComponent.dependencies;
        let [injectedDirective] = testComponent.injectedDirectives;

        expect(dependency.name).to.equal('TestDirective');
        expect(dependency.optional).to.equal(false);
        expect(injectedDirective.name).to.equal('TestDirective');
        expect(injectedDirective.optional).to.equal(false);
    });

    it('should correctly parse information about components that depend on other components', () => {
        let banana = create();

        let result = banana({ in: './test/fixtures/components/component-dependency/*.ts' });
        let [otherComponentFile, testComponentFile] = Object.values(result);
        let [otherComponent] = otherComponentFile.classes as Array<ComponentInfo>;
        let [testComponent] = testComponentFile.classes as Array<ComponentInfo>;

        let [canContain] = otherComponent.canContain;
        expect(canContain).to.equal(testComponent);

        let [dependency] = testComponent.dependencies;
        let [injectedComponent] = testComponent.injectedComponents;

        expect(dependency.name).to.equal('OtherComponent');
        expect(dependency.optional).to.equal(false);
        expect(injectedComponent.name).to.equal('OtherComponent');
        expect(injectedComponent.optional).to.equal(false);
    });
});
