import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs, { read } from "fs";
import { writeFile } from "fs/promises";
import { BACKEND } from "@/utils/logging";
import { readUserJson, unzip } from "@/utils/io";

export const POST = async (req: NextRequest, res: NextResponse) => {
  BACKEND.info("Received a request to upload a file");

  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await (file as File).arrayBuffer());
  const filename = "upload_" + Date.now() + ".zip";
  BACKEND.info(`Writing file: ${filename}...`);
  const uploadsPath = path.join(process.cwd(), "uploads");
  const zipFilePath = path.join(uploadsPath, filename);
  const zipFolderPath = path.join(uploadsPath, filename.replace(".zip", ""));

  try {
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath);
    }
    if (!fs.existsSync(zipFolderPath)) {
      fs.mkdirSync(zipFolderPath);
    }

    await writeFile(zipFilePath, buffer);
    BACKEND.success(`Upload success!`);

    BACKEND.info(`Unzipping file ${filename}...`);
    await unzip(zipFilePath, zipFolderPath);
    BACKEND.success(`Unzip success!`);

    BACKEND.info(`Reading essential files...`);
    const user = await readUserJson(path.join(zipFolderPath, "account"), filename.replace(".zip", ""));
    BACKEND.success(`Operation success!`);

    return NextResponse.json({ Message: "Success", status: 201, data: {user} });
  } catch (error) {
    BACKEND.error(`Failed to write/unzip file:`);
    console.error(error);

    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
