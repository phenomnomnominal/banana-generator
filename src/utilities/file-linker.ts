// Dependencies:
import { Injectable } from 'injection-js';
import { ClassInfo, ComponentInfo, DirectiveInfo, EnumInfo, FileInfo, ModuleInfo } from '../parsers';

@Injectable()
export class FileLinker {
    public linkFiles (files: Array<FileInfo>): Array<FileInfo> {
        let allClasses: Array<ClassInfo> = [];

        files.forEach(file => {
            let { classes, enums } = file;
            if (classes) {
                allClasses = [...allClasses, ...classes];
            }
        });

        let allDirectives = allClasses.filter(c => c instanceof DirectiveInfo) as Array<DirectiveInfo>;
        let allComponents = allDirectives.filter(c => c instanceof ComponentInfo) as Array<ComponentInfo>;
        let allModules = allClasses.filter(c => c instanceof ModuleInfo) as Array<ModuleInfo>;

        this._findInjectedComponents(allComponents);
        this._findInjectedDirectives(allComponents, allDirectives);
        this._findModules(allComponents, allModules);

        return files;
    }

    private _findInjectedComponents (components: Array<ComponentInfo>): void {
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

    private _findInjectedDirectives (components: Array<ComponentInfo>, directives: Array<DirectiveInfo>): void {
        components.forEach(component => this._findInjectedDirective(component, directives));
    }

    private _findInjectedDirective (component: ComponentInfo, directives: Array<DirectiveInfo>): void {
        component.dependencies.map(dependency => {
            let directiveDependency = directives.find(d => d.name === dependency.name);
            if (directiveDependency) {
                directiveDependency.canAffect.push(component);
                component.injectedDirectives.push(dependency);
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
