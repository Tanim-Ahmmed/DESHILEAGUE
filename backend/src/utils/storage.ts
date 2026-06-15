// packages/shared-utils/storage.ts
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});


// ✅ Multer setup (memory storage)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// ✅ Upload buffer to Cloudinary
export async function uploadBufferToCloudinary(
  fileBuffer: Buffer,
  folder: string = "uploads"
): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto", // image, video, pdf সবই handle করবে
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        if (!result) {
          return reject(new Error("Cloudinary upload failed: No result"));
        }
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}
