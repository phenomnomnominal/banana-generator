// Dependencies:
import { Injectable } from 'injection-js';
import { ArrayLiteralExpression, CallExpression, ClassDeclaration, ClassElement, Declaration, Decorator, EnumDeclaration, EnumMember, Expression, Identifier, Node, NodeArray, NodeFlags, ObjectLiteralElementLike, ObjectLiteralExpression, PropertyAssignment, Symbol, SyntaxKind } from 'typescript';

@Injectable()
export class ASTHelper {
    public findDeclarations (symbol: Symbol): Array<Declaration> {
        let { declarations } = symbol;
        return declarations || [];
    }

    public findDecorator (decorators: Array<Decorator>, name: string): Decorator | null {
        return decorators.find(decorator => {
            let decoratorName = (decorator.expression as CallExpression).expression.getText();
            return decoratorName === name;
        }) || null;
    }

    public findDecoratorProperties (decorator: Decorator): NodeArray<PropertyAssignment> {
        let [decoratorProperties] = (decorator.expression as CallExpression).arguments;
        let { properties } = decoratorProperties as ObjectLiteralExpression;
        return properties as NodeArray<PropertyAssignment>;
    }

    public findDecorators (symbol: Symbol): Array<Decorator> {
        let [declaration] = this.findDeclarations(symbol);
        let { decorators } = declaration as ClassDeclaration;
        return decorators || [];
    }

    public findMembers (symbol: Symbol): Array<EnumMember | ClassElement> {
        let [declaration] = this.findDeclarations(symbol);
        let { members } = declaration as EnumDeclaration;
        return members && members.length ? members : [];
    }

    public findProperty (properties: NodeArray<PropertyAssignment>, name: string): PropertyAssignment | null {
        return properties.find(property => {
            return (property.name as Identifier).text === name;
        }) || null;
    }

    public findValues (members: Array<EnumMember | ClassElement>): Array<string> {
        return members.map(member => (member.name as Identifier).text);
    }
}
