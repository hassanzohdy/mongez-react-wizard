import concatRoute from "@mongez/concat-route";
import fs from "@mongez/fs";
import { toCamelCase, toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import { messages } from "../utils/messages";
import { wizardCache } from "../utils/mongez";
import { apps, cloneable } from "../utils/paths";
import { generateStub } from "../utils/stubs";
import createComponent from "./createComponent";

export type ModuleCreator = {
    app: string;
    module: string;
    style?: 'scss' | 'styled' | 'all';
    route?: string;
    routeMethod?: string;
}

export default function createModule({ style, routeMethod, module, app, route, }: ModuleCreator) {
    const appDirectory = apps(app);
    const moduleDirectory = apps(app, module);

    if (!route) {
        route = '/' + toCamelCase(module);
    }

    route = concatRoute(route);

    if (!fs.isDirectory(appDirectory)) {
        return messages.error(`${app} app does not exist in src/apps directory.`);
    }

    if (fs.isDirectory(moduleDirectory)) {
        throw messages.error(`${app} module exists in src/apps/${app} directory.`);
    }

    if (!routeMethod) {
        routeMethod = wizardCache.get('routeMethod', 'publicRoutes');
    }

    wizardCache.set('routeMethod', routeMethod);

    const data = {
        module: toCamelCase(module),
        Module: toStudlyCase(module),
    }

    console.log(chalk.cyan(`Creating ${toStudlyCase(data.Module)} Module...`));

    const replacements = {
        '{{ appName }}': app,
        '{{ moduleName }}': module,
        '{{ ModuleName }}': data.Module,
        '{{ ModuleComponentPage }}': data.Module + 'Page',
        '{{ route }}': toCamelCase(route),
        '{{ routeString }}': route,
        '{{ routeMethod }}': routeMethod,
        '{{ ModuleService }}': data.Module + 'Service',
        '{{ moduleService }}': data.module + 'Service',
    }

    // clone the module
    fs.copy(cloneable('module'), moduleDirectory);

    // start replacing files
    // routes file
    generateStub(moduleDirectory + '/routes.stub', moduleDirectory + '/routes.ts', replacements);

    // services file
    generateStub(moduleDirectory + '/services/service.stub', moduleDirectory + '/services/service.ts', replacements);

    createComponent({
        module,
        style,
        app,
        component: data.Module + 'Page',
        imports: 'import Helmet from "@mongez/react-helmet";',
        prependToComponent: `<Helmet title="${data.Module + 'Page'}" />`,
    });

    // Update app routes
    const appModulesPath = appDirectory + `/${app}-modules.json`;
    const appModules: any = fs.getJson(appModulesPath);

    appModules.modules.unshift({
        entry: [route],
        module,
    });

    fs.putJson(appModulesPath, appModules);

    updateUrls(route, appDirectory);

    console.log(chalk.greenBright(`${data.Module} Module Has Been Created Successfully.`));
}

function updateUrls(route: string, appDirectory: string) {
    let searchFor = `  // append urls here, DO NOT remove this line`;

    let urlsPath = appDirectory + `/utils/urls`;

    if (!fs.exists(urlsPath)) return;

    let urlsContent = fs.get(urlsPath).replace(searchFor, `  ${toCamelCase(route)}: '${route}',\r\n${searchFor}`);

    fs.put(urlsPath, urlsContent);
}