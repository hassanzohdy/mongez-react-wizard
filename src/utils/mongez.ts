import fs from "@mongez/fs";
import { Obj } from "@mongez/reinforcements";
import { mongezRoot } from "./paths";

const wizardCacheFile = "react-wizard.json";

export const wizardCache = makeCache(wizardCacheFile);

if (!fs.isDirectory(mongezRoot())) {
  fs.makeDirectory(mongezRoot(), 777);
}

export function makeCache(wizardFilePath: string, defaultData: any = {}) {
  let content = {};
  let loaded: boolean = false;

  if (!fs.exists(mongezRoot(wizardFilePath))) {
    fs.putJson(mongezRoot(wizardFilePath), defaultData);
  }

  return {
    get(key: string, defaultValue: any = null): any {
      return Obj.get(this.content(), key, defaultValue);
    },
    set(key: string, value: any) {
      Obj.set(content, key, value);
      fs.putJson(mongezRoot(wizardFilePath), content);
    },
    content(): any {
      if (loaded) return content;

      loaded = true;

      content = fs.getJson(mongezRoot(wizardFilePath));

      return content;
    },
    all(): any {
      return this.content();
    },
  };
}
