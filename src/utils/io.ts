import unzipper from "unzipper";
import fs from "fs";
import { DiscordMessage, DiscordServer, DiscordTextChannel, DiscordUser, PackageViewerChannel } from "@/types/discord";
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
      const user: DiscordUser = { username: obj.username, global_name: obj.global_name, id: obj.id, uploadFolder: folderName };
      return resolve(user);
    });
  });
}

export async function readChannelsJson(uploadId: string): Promise<PackageViewerChannel[]> {
  return await new Promise((resolve, reject) => {
    fs.readFile(path.join(process.cwd(), "uploads", uploadId, "messages", "index.json"), (error, channelsData) => { // GET ALL CHANNEL INDEXES
      if (error) {
        return reject(error);
      }
      const channelsMap: Object = JSON.parse(channelsData.toString());
      let channels: PackageViewerChannel[] = [];

      Object.entries(channelsMap).forEach(([id, name]) => {
        fs.readFile(path.join(process.cwd(), "uploads", uploadId, "messages", "c" + id, "channel.json"), (error, channelIdxData) => { // FETCH ALL CHANNEL DATA
          if (error) {
            return reject(error);
          }
          const channelDetails: DiscordTextChannel = JSON.parse(channelIdxData.toString());
          fs.readFile(path.join(process.cwd(), "uploads", uploadId, "messages", "c" + id, "messages.json"), (error, messagesData) => {  // FETCH ALL MESSAGES FROM CHANEL
            if (error) {
              return reject(error);
            }
            const messages: DiscordMessage[] = JSON.parse(messagesData.toString());
            channels.push({ channel: channelDetails, messages, uploadFolder: uploadId });

            if(channels.length >= Object.keys(channelsMap).length) {
              channels.sort((a,b) => a.messages.length > b.messages.length ? -1 : 1);
              return resolve(channels);
            }
          });
        });
        
      });
    });
  });
}