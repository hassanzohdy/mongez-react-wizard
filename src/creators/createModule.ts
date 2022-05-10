import fs from "@mongez/fs";
import { toCamelCase, toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import { messages } from "../utils/messages";
import { apps, cloneable } from "../utils/paths";
import { generateStub } from "../utils/stubs";
import createComponent from "./createComponent";

export type ModuleCreator = {
    app: string;
    module: string;
}

export default function createModule({ module, app }: ModuleCreator) {
    const appDirectory = apps(app);
    const moduleDirectory = apps(app, module);

    if (!fs.isDirectory(appDirectory)) {
        return messages.error(`${app} app does not exist in src/apps directory.`);
    }

    if (fs.isDirectory(moduleDirectory)) {
        throw messages.error(`${app} module exists in src/apps/${app} directory.`);
    }
    const data = {
        module: toCamelCase(module),
        Module: toStudlyCase(module),
    }

    console.log(chalk.cyan(`Creating ${toStudlyCase(data.Module)} Module...`));

    const replacements = {
        '{{ appName}}': app,
        '{{ moduleName }}': module,
        '{{ ModuleName }}': data.Module,
        '{{ ModuleComponentPage }}': data.Module + 'Page',
        '{{ route }}': toCamelCase(module),
        '{{ routeString }}': '/' + toCamelCase(module),
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
        app,
        component: data.Module + 'Page',
        imports: 'import Helmet from "@mongez/react-helmet";',
        prependToComponent: `<Helmet title="${data.Module + 'Page'}" />`,
    });
    console.log(chalk.greenBright(`${data.Module} Module Has Been Created Successfully.`));
}