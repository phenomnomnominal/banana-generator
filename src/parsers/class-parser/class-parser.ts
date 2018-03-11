// Dependencies:
import { Injectable } from 'injection-js';
import { ClassDeclaration, ClassElement, ClassLikeDeclaration, ConstructorDeclaration, Declaration, Decorator, forEachChild, Node, SourceFile, SyntaxKind, TypeChecker, TypeReferenceNode } from 'typescript';
import { ASTHelper, TypeHelper } from '../../utilities';
import { ClassInfo } from './class-info';
import { ComponentParser } from './component-parser';
import { DependencyInfo } from './dependency-info';
import { DirectiveParser } from './directive-parser';
import { ModuleParser } from './module-parser';

@Injectable()
export class ClassParser {
    private _checker: TypeChecker;

    constructor (
        private _astHelper: ASTHelper,
        private _componentParser: ComponentParser,
        private _directiveParser: DirectiveParser,
        private _moduleParser: ModuleParser,
        _typeHelper: TypeHelper
    ) {
        this._checker = _typeHelper.getChecker();
    }

    public findClasses (sourceFile: SourceFile): Array<ClassInfo> {
        let classes: Array<ClassInfo> = [];
        forEachChild(sourceFile, child => this._visit(classes, child));
        return classes;
    }

    private _visit (classes: Array<ClassInfo>, node: Node) {
        const { kind } = node;

        if (kind === SyntaxKind.ClassDeclaration) {
            classes.push(this._getClassInfo(node as ClassDeclaration));
        }
    }

    private _getClassInfo (node: ClassDeclaration): ClassInfo {
        if (!node.name) {
            throw new Error(`Could not find "name" for class in "${node.getSourceFile().fileName}"`);
        }

        let symbol = this._checker.getSymbolAtLocation(node.name);
        let { name } = symbol;

        let decorators = this._astHelper.findDecorators(symbol);
        let declarations = this._astHelper.findDeclarations(symbol);
        let members = this._astHelper.findMembers(symbol) as Array<ClassElement>;

        let classInfo = new ClassInfo(name);

        let moduleDecorator = this._astHelper.findDecorator(decorators, 'NgModule');
        if (moduleDecorator) {
            return this._moduleParser.parseModule(name, moduleDecorator);
        }

        let componentDecorator = this._astHelper.findDecorator(decorators, 'Component');
        if (componentDecorator) {
            classInfo = this._componentParser.parseComponent(name, componentDecorator, members);
        }

        let directiveDecorator = this._astHelper.findDecorator(decorators, 'Directive');
        if (directiveDecorator) {
            classInfo = this._directiveParser.parseDirective(name, directiveDecorator, members);
        }

        classInfo.setImplements(this._findImplements(declarations));
        classInfo.setDependencies(this._findDependencies(members));

        return classInfo;
    }

    private _findConstructor (members: Array<ClassElement>): ConstructorDeclaration | undefined {
        return members.find(member => member.kind === SyntaxKind.Constructor) as ConstructorDeclaration;
    }

    private _findDependencies (members: Array<ClassElement>): Array<DependencyInfo> {
        let cons = this._findConstructor(members);
        if (cons) {
            return cons.parameters.map(parameter => {
                let { decorators, type } = parameter;
                let instanceName = parameter.name.getText();
                let { fileName } = parameter.getSourceFile();

                if (!type) {
                    throw new Error(`Could not find type of dependency "${instanceName}" at "${fileName}"`);
                }
                let name = (type as TypeReferenceNode).typeName.getText();
                let dependencyInfo = new DependencyInfo(name);

                if (decorators) {
                    dependencyInfo.setOptional(this._astHelper.findDecorator(decorators, 'Optional'));
                }

                return dependencyInfo;
            });
        }
        return [];
    }

    private _findImplements (declarations: Array<Declaration>) {
        let [declaration] = declarations;
        let { heritageClauses } = declaration as ClassLikeDeclaration;
        if (heritageClauses) {
            let [heritage] = heritageClauses;
            return heritage.types.map(type => type.expression.getText());
        }
        return [];
    }
}
