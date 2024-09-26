import { NextRequest, NextResponse } from "next/server";
const cloudinary = require("cloudinary").v2;
require("./cloudinary").connect();

const uploadImageToCloudinary = async (
  fileBuffer: Buffer,
  folder,
  height,
  quality
) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";

  return await cloudinary.uploader
    .upload_stream(options, (error, result) => {
      if (error) {
        throw new Error(error);
      }
      return result;
    })
    .end(fileBuffer); // Send the file buffer here
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file"); // Ensure your input field has the name 'file'
    const folder = formData.get("folder") || "default_folder";
    const height = formData.get("height");
    const quality = formData.get("quality");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // Convert the file to a Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await uploadImageToCloudinary(
      fileBuffer,
      folder,
      height,
      quality
    );
    return NextResponse.json(uploadResult, { status: 200 });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
