import { readFileSync } from "fs";

const readContent = ( filePath ) => {
    return readFileSync(filePath).toString("utf-8");
}

export default readContent