import { program } from "commander";
import createComponent from "../creators/createComponent";
import createModule from "../creators/createModule";
import { messages } from "../utils/messages";
import { wizardCache } from "../utils/mongez";
import bootstrap from "./bootstrap";

export default function letTheMagicBegin() {
    bootstrap();
    // npx engez module moduleName --app appName
    program
        .command("module <moduleName>")
        .option('--style <mode>', 'Defines the generated component style mode, it can be styled | scss | all, defaults to all')
        .option("--route <route>", "Module Route")
        .option("--routeMethod <routeMethod>", "Module Route Method that will be called from the router helpers")
        .option("--app <app>", "Application directory name that will contain the module")
        .description("Create React Module")
        .action((moduleName, options) => {
            let app = options.app || wizardCache.get('app');

            if (!app) {
                messages.error(`--app option is required`);

                return;
            }

            wizardCache.set('app', app);

            createModule({
                module: moduleName,
                app: app,
                style: options.style,
                route: options.route,
                routeMethod: options.routeMethod,
            });
        });

    // npx engez component componentName --app appName --module moduleName
    program
        .command("component <componentName>")
        .option("--app <app>", "Application directory name that will contain the module")
        .option("--module <module>", "Module name in the app")
        .option('--style <mode>', 'Defines the generated component style mode, it can be styled | scss | all')
        .description("Create React Component")
        .action((componentName, options) => {
            let app = options.app || wizardCache.get('app');

            if (!app) {
                return messages.error(`--app option is required`);
            }

            wizardCache.set('app', app);

            let module = options.module || wizardCache.get('module');

            if (!module) {
                return messages.error(`--module option is required`);
            }

            wizardCache.set('module', module);

            createComponent({
                module,
                app,
                component: componentName,
                style: options.style,
            });
        });

    program.parse(process.argv);
}