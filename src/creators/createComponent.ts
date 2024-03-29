import fs from "@mongez/fs";
import { toCamelCase, toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import { messages } from "../utils/messages";
import { wizardCache } from "../utils/mongez";
import { apps, cloneable } from "../utils/paths";
import { generateStub } from "../utils/stubs";

type ComponentCreator = {
    component: string;
    app: string;
    module: string;
    prependToComponent?: string;
    imports?: string;
    style?: 'scss' | 'styled' | 'all'
}
export default function createComponent({ style, prependToComponent, imports, module, app, component }: ComponentCreator) {
    const componentPath = apps(app, module, 'components', toStudlyCase(component));

    if (fs.isDirectory(componentPath)) {
        return messages.error(`src/apps/${app}/${module}/components/${component} directory exists, exiting...`);
    }

    console.log(chalk.cyan(`Creating ${toStudlyCase(component)} Component...`));

    const data = {
        module: toCamelCase(module),
        Module: toStudlyCase(module),
        Component: toStudlyCase(component),
    }

    if (!style) {
        style = wizardCache.get('style', 'all');
    }

    wizardCache.set('style', style);

    const isScss = ['all', 'scss'].includes(style!);

    const replacements = {
        '{{ moduleName }}': module,
        '{{ ModuleName }}': data.Module,
        '{{ Component }}': data.Component,
        '{{ imports }}': `${isScss ? `import classes from './index.module.scss';\r\n` : ''}import { ${data.Component}Props } from './types';\r\n` + (imports ? imports + '\r\n' : ''),
        '{{ prependToComponent }}': prependToComponent ? prependToComponent + '\r\n\t\t\t' : '',
    }

    // clone the component
    fs.copy(cloneable('component'), componentPath);

    // start replacing files
    // component index file
    generateStub(componentPath + '/index.stub', componentPath + '/index.ts', replacements);

    if (!['all', 'styled'].includes(style!)) {
        fs.remove(componentPath + '/styled.tsx');
    }

    if (!isScss) {
        fs.remove(componentPath + `/index.module.scss`);
    }

    // component file
    generateStub(componentPath + '/component.stub', componentPath + `/${data.Component}.tsx`, replacements);

    // component types file
    generateStub(componentPath + '/types.stub', componentPath + `/types.ts`, replacements);

    console.log(chalk.greenBright(`${toStudlyCase(component)} Component Has Been Created Successfully.`));
}