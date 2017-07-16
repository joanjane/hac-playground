import { Component, ApplicationRef } from '@angular/core';

const rootComponentsMap: {
    string?: Component
} = {};

export class ComponentBootstrapper {
    /**
     * Register a component to be bootstrapped if exists on dom at start
     * @param component Component to register
     * @param selector Component selector
     */
    static registerRootComponent(component: any, selector: string): void {
        rootComponentsMap[selector] = component;
    }

    /**
     * List registered components, useful to declare them on @NgModule entryComponents.
     * Warning: This is not statically analizable, so when working on AOT, put entryComponents
     * manually referencing types.
     */
    static getRegisteredRootComponents(): any[] {
        return Object.keys(rootComponentsMap).map(k => rootComponentsMap[k]);
    }

    /**
     * Bootstrapp all elements that have matching selector registered with 
     * ComponentBootstrapper.registerRootComponent(component, selector)
     * @param appRef ApplicationRef of module to bootstrap
     */
    static bootstrap(appRef: ApplicationRef) {
        const rootElems = document.querySelectorAll(this.buildRootComponentsSelector());

        for (let i = 0; i < rootElems.length; i++) {
            const rootElem = rootElems[i];
            const componentSelector = rootElem.nodeName.toLowerCase();

            const matchedComponent = this.getRegisteredComponentBySelector(componentSelector);
            if (!matchedComponent) {
                throw new Error(`Error bootstrapping component '${componentSelector}' was not registered`);
            }
            appRef.bootstrap(matchedComponent, rootElem);
        }
    }

    private static getRegisteredComponentBySelector(selector: string): any {
        return rootComponentsMap[selector];
    }

    private static buildRootComponentsSelector(): string {
        return Object.keys(rootComponentsMap).join(', ');
    }
}