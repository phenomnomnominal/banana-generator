// Dependencies:
import { Injectable } from 'injection-js';
import { ClassInfo, ClassTypeEnum, ComponentInfo, DirectiveInfo, EnumInfo, FileInfo, ModuleInfo } from '../parsers';

@Injectable()
export class FileLinker {
    public linkFiles (files: Array<FileInfo>): Array<FileInfo> {
        let allClasses: Array<ClassInfo> = [];

        files.forEach(file => {
            let { classes } = file;
            if (classes) {
                allClasses = [...allClasses, ...classes];
            }
        });

        let allComponents = allClasses.filter(c => c.classType === ClassTypeEnum.component) as Array<ComponentInfo>;
        let allDirectives = allClasses.filter(c => c.classType === ClassTypeEnum.directive) as Array<DirectiveInfo>;
        let allModules = allClasses.filter(c => c.classType === ClassTypeEnum.module) as Array<ModuleInfo>;

        this._findInjectedComponentsForComponents(allComponents);
        this._findInjectedDirectivesForDirectives(allDirectives);
        this._findInjectedDirectivesForComponents(allComponents, allDirectives);
        this._findModules(allComponents, allModules);

        return files;
    }

    private _findInjectedComponentsForComponents (components: Array<ComponentInfo>): void {
        components.forEach(component => this._findInjectedComponent(component, components));
    }

    private _findInjectedComponent (component: ComponentInfo, components: Array<ComponentInfo>): void {
        component.dependencies.map(dependency => {
            let componentDependency = components.find(c => c.name === dependency.name);
            if (componentDependency) {
                componentDependency.canContain.push(component);
                component.injectedComponents.push(dependency);
            }
        });
    }

    private _findInjectedDirectivesForComponents (components: Array<ComponentInfo>, directives: Array<DirectiveInfo>): void {
        components.forEach(component => this._findInjectedDirective(component, directives));
    }

    private _findInjectedDirectivesForDirectives (directives: Array<DirectiveInfo>): void {
        directives.forEach(directive => this._findInjectedDirective(directive, directives));
    }

    private _findInjectedDirective (directive: DirectiveInfo, directives: Array<DirectiveInfo>): void {
        directive.dependencies.map(dependency => {
            let directiveDependency = directives.find(d => d.name === dependency.name);
            if (directiveDependency) {
                directiveDependency.canAffect.push(directive);
                directive.injectedDirectives.push(dependency);
            }
        });
    }

    private _findModules (components: Array<ComponentInfo>, modules: Array<ModuleInfo>): void {
        components.forEach(component => this._findModule(component, modules));
    }

    private _findModule (component: ComponentInfo, modules: Array<ModuleInfo>): void {
        let found = modules.find(m => {
            return !!(m.declarations && m.declarations.find(d => d === component.name));
        });
        if (found == null) {
            throw new Error(`Could not find "module" for "${component.name}"`);
        }
        component.module = found;
    }
}
