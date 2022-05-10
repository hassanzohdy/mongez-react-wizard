import fs from "@mongez/fs";
import { Obj } from "@mongez/reinforcements";
import { mongezRoot } from "./paths";

const wizardCacheFile = 'react-wizard.json';

let content = {};

let loaded: boolean = false;

export const wizardCache = {
    get(key: string, defaultValue: any): any {
        return Obj.get(this.content(), key, defaultValue);
    },
    set(key: string, value: any) {
        Obj.set(content, key, value);
        fs.putJson(mongezRoot(wizardCacheFile), content);
    },
    content(): any {
        if (loaded) return content;

        loaded = true;

        if (!fs.exists(mongezRoot(wizardCacheFile))) return content;

        content = fs.getJson(mongezRoot(wizardCacheFile));
    }
}