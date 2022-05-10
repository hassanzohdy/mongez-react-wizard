import fs from "@mongez/fs";
import { mongezRoot, root } from "../utils/paths";

export default function bootstrap() {
    if (!fs.isDirectory(mongezRoot())) {
        fs.makeDirectory(mongezRoot(), 777);
    }
}