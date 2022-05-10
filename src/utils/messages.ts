import chalk from "chalk";

export const messages = {
    error: (...message: any[]) => console.log(chalk.bgRedBright.bold(...message))
}