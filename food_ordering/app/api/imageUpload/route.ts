import { NextRequest, NextResponse } from "next/server";
const cloudinary = require("cloudinary").v2;
require("./cloudinary").connect();

const uploadImageToCloudinary = (
  fileBuffer: Buffer,
  folder: string,
  height?: number,
  quality?: number
): Promise<any> => {
  const options: any = { folder, resource_type: "auto" };
  if (height) options.height = height;
  if (quality) options.quality = quality;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result); // This will return the result of the upload
      }
    );
    uploadStream.end(fileBuffer); // Send the file buffer here
  });
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

    // Return the link to the uploaded image
    return NextResponse.json({ url: uploadResult.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
