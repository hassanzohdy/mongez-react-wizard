import React from 'react';
import concatRoute from './concat-route';
import { getLocaleCodes } from './../localization';
import { getCurrentBseAppPath } from './apps-list';

export interface BasicComponentProps {
    key?: string;
    [key: string]: any;
    children?: React.ReactNode;
}

type Middleware = React.ReactNode | React.ReactNode[];

type Wrapper = React.FunctionComponent<BasicComponentProps>;

export interface Route {
    path: string;
    component: React.FunctionComponent<BasicComponentProps>;
    middleware?: Middleware;
}

export interface Layout {
    LayoutComponent: Wrapper;
    routes: Route[];
    routesList: string[];
}

export interface GroupOptions {
    routes: Route[];
    path: string;
    middleware: Middleware;
    layout: Wrapper;
}

// join all locale code with | for route matching
const gluedLocaleCodes = getLocaleCodes().join('|');

/**
 * Default Full Page >> It Will be just a React Fragment
 */
export const FULL_PAGE: Wrapper = ({ key, children }: BasicComponentProps) => <React.Fragment key={key} children={children} />;

/**
 * Set all layouts that will wrap the application routes
 * 
 * @const  {Array}  
 */
export const layoutsList: Array<Layout> = [];

/**
 * Add new route to the routes list of full page
 *
 * @param {string} path
 * @param {React.Component} component
 * @param {Function|Array|null} middleware
 */
export function addRouter(path: string, component: React.FunctionComponent<BasicComponentProps>, middleware = null) {
    return partOf(FULL_PAGE, [{
        path,
        component,
        middleware
    }]);
}

/**
 * Add the given routes as part of the given layout
 * 
 * @param  {React.Component} LayoutComponent
 * @param  {Array} routes   
 */
export function partOf(LayoutComponent: Wrapper, routes: Array<Route>) {
    let layout = layoutsList.find(layout => layout.LayoutComponent === LayoutComponent);

    // if the layout component does not exist
    // then create new one and add it to the layouts list
    if (!layout) {
        layout = {
            LayoutComponent,
            routes: [],
            routesList: [],
        };

        layoutsList.push(layout);
    }

    routes = routes.map(route => {
        // added optional localization
        // /users
        // /en/users
        // /ar/users
        // route.path = `/:localeCode(${gluedLocaleCodes})?${route.path}`;
        route.path = concatRoute(`/:localeCode(${gluedLocaleCodes})?`, getCurrentBseAppPath(), route.path);

        (layout as Layout).routesList.push(route.path);
        return route;
    });

    layout.routes = layout.routes.concat(routes);
}

/**
 * Group the given routes with the given options
 * 
 * @param  object groupOptions
 */
export function group(groupOptions: GroupOptions) {
    const { routes, path, middleware, layout = FULL_PAGE } = groupOptions;

    partOf(layout, routes.map(route => {
        if (middleware) {
            route.middleware = middleware;
        }

        if (path) {
            route.path = concatRoute(path, route.path);
        }

        return route;
    }))
}