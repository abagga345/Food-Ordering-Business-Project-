const cloudinary = require("cloudinary").v2;
require("../imageUpload/cloudinary").connect();
import { NextRequest, NextResponse } from "next/server";

const deletePicture = async (imageURL:any) => {
  const publicIdImage = imageURL
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "");

  await cloudinary.uploader.destroy(`default_folder/${publicIdImage}`, {
    type: "upload",
    resource_type: "image",
  });
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const uploadResult = await deletePicture(file);

    // Return the link to the uploaded image
    return NextResponse.json(
      { message: "Image Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
