import { program } from "commander";
import createComponent from "../creators/createComponent";
import createModule from "../creators/createModule";
import { messages } from "../utils/messages";

export default function letTheMagicBegin() {
    // npx engez module moduleName --app appName
    program
        .command("module <moduleName>")
        .option("--app <app>", "Application directory name that will contain the module")
        .description("Create React Module")
        .action((moduleName, options) => {
            if (!options.app) {
                messages.error(`--app option is required`);

                return;
            }

            createModule({
                module: moduleName,
                app: options.app
            });
        });

    // npx engez component componentName --app appName --module moduleName
    program
        .command("component <componentName>")
        .option("--app <app>", "Application directory name that will contain the module")
        .option("--module <module>", "Module name in the app")
        .description("Create React Component")
        .action((componentName, options) => {
            if (!options.app) {
                return messages.error(`--app option is required`);
            }

            if (!options.module) {
                return messages.error(`--module option is required`);
            }

            createComponent({
                module: options.module,
                app: options.app,
                component: componentName,
            });
        });

    program.parse(process.argv);
}