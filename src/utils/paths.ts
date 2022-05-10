import * as path from "path";
import { cwd } from "process";

export function cloneable(...paths: string[]) {
  return path.resolve(__dirname, './../../clonables', ...paths);
}

export function root(...appendPath: string[]): string {
  return path.resolve(cwd(), ...appendPath);
}

export function src(...appendPath: string[]): string {
  return root("src", ...appendPath);
}

export function apps(...appendPath: string[]): string {
  return src('apps', ...appendPath);
}

export function mongezRoot(...appendPath: string[]): string {
  return root("mongez", ...appendPath);
}

export function wizardPath(): string {
  return root("mongez.json");
}
