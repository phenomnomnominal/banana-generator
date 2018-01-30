export function findRelationships (results) {
    let allClasses = [];
    let allEnums = [];
    Object.keys(results).forEach(key => {
        let { classes, enums } = results[key];
        if (classes) {
            allClasses = allClasses.concat(classes);
        }
        if (enums) {
            allEnums = allEnums.concat(enums);
        }
    });

    let allComponents = allClasses.filter(c => c.isComponent);
    let allDirectives = allClasses.filter(c => c.isDirectives);

    allComponents.forEach(component => {
        component.parentComponents = [];
        component.parentDirectives = [];
        component.dependencies.map(dependency => {
            let componentDependency = allComponents.find(c => c.name === dependency.name);
            if (componentDependency) {
                componentDependency.contains = componentDependency.contains || [];
                componentDependency.contains.push(component);
                component.parentComponents.push(dependency);
            }
            let directiveDependency = allDirectives.find(d => d.name === dependency.name);
            if (directiveDependency) {
                directiveDependency.affects = directiveDependency.affects || [];
                directiveDependency.affects.push(component);
                component.parentDirectives.push(dependency);
            }
        });
    });

    return results;
}
