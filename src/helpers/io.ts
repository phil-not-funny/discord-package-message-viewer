import unzipper from "unzipper";
import fs from "fs";

export async function unzip(zipFilePath: string, zipFolderPath: string): Promise<void> {
    await new Promise((resolve, reject) => fs.createReadStream(zipFilePath)
      .pipe(unzipper.Extract({ path: zipFolderPath }))
      .on("close", () => {
        return resolve(undefined);
      }).on("error", (error) => {
        return reject(error);
      }))
}