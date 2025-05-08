import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const determineFileType = (mimeType) => {
  if (!mimeType) throw new Error("MimeType is missing");
  if (mimeType.startsWith("image/")) return "image";
  throw new Error("Only image files are allowed.");
};

export const UploadToCloudinary = (file, folderName = "default") => {
  if (!file || !file.buffer || !file.mimetype) {
    throw new Error("Invalid file object.");
  }

  const { buffer, mimetype } = file;
  const resourceType = determineFileType(mimetype);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: folderName,
      },
      (error, result) => {
        if (error) return reject(new Error(`Upload failed: ${error.message}`));
        resolve({
          url: result.secure_url,
          type: result.resource_type,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
};
