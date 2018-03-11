// Dependencies:
import { ClassTypeEnum, ModuleInfo } from '../src';
import { create, expect } from './test-setup';

describe('banana-generator - modules:', () => {
    it('should correctly parse information about modules', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/modules/default/*.ts' });
        let [moduleFile] = Object.values(result);
        let [testModule] = moduleFile.classes as Array<ModuleInfo>;

        expect(testModule.name).to.equal('TestModule');
        expect(testModule.classType).to.equal(ClassTypeEnum.module);
        expect(testModule.declarations).to.deep.equal([]);
    });

    it('should correctly parse information about modules when they have components', async () => {
        let banana = create();

        let result = await banana({ in: './test/fixtures/modules/component/*.ts' });
        let [, moduleFile] = Object.values(result);
        let [testModule] = moduleFile.classes as Array<ModuleInfo>;

        expect(testModule.name).to.equal('TestModule');
        expect(testModule.classType).to.equal(ClassTypeEnum.module);
        expect(testModule.declarations).to.deep.equal(['TestComponent']);
    });
});
