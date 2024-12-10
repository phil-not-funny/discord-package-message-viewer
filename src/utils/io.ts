import unzipper from "unzipper";
import fs from "fs";
import { DiscordUser } from "@/types/discord";
import path from "path";
import { BACKEND } from "./logging";

export async function unzip(
  zipFilePath: string,
  zipFolderPath: string
): Promise<void> {
  return await new Promise((resolve, reject) =>
    fs
      .createReadStream(zipFilePath)
      .pipe(unzipper.Extract({ path: zipFolderPath }))
      .on("close", () => {
        return resolve(undefined);
      })
      .on("error", (error) => {
        return reject(error);
      })
  );
}

export async function readUserJson(url: string, folderName: string): Promise<DiscordUser> {
  return await new Promise((resolve, reject) => {
    fs.readFile(path.join(url, "user.json"), (error, data) => {
      if (error) {
        return reject(error);
      }
      const obj: any = JSON.parse(data.toString());
      BACKEND.info(`Avatar Path: ${path.join(url.substring(url.indexOf("public")), "avatar.png")}`);
      
      const user: DiscordUser = { username: obj.username, global_name: obj.global_name, id: obj.id, uploadFolder: folderName };
      return resolve(user);
    });
  });
}
