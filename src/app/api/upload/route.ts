import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const formData = await req.formData();

  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await (file as File).arrayBuffer());

  const filename = "upload_" + Date.now() + ".zip";
  console.log(filename);

  try {
    if(!fs.existsSync(path.join(process.cwd(), "uploads/"))) {
        fs.mkdirSync(path.join(process.cwd(), "uploads/"));
     }

    await writeFile(path.join(process.cwd(), "uploads/" + filename), buffer);
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
