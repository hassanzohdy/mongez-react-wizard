import fs from "@mongez/fs";

export function replaceStubs(content: string, replacements: any) {
    for (let key in replacements) {
        content = content.replace(new RegExp(key, 'g'), replacements[key]);
    }

    return content;
}

export function generateStub(originalPath: string, newPath: string, replacements: any) {
    fs.rename(originalPath, newPath);
    fs.put(newPath, replaceStubs(fs.get(newPath), replacements));
}