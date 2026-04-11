const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImage = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `calcutta_sweets/${folder}`,
    });
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    throw new Error("Cloudinary upload failed");
  }
};

const deleteImage = async (publicId) => {
  if (!publicId) return;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok' && result.result !== 'not found') {
      console.warn(`[Cloudinary] Unexpected delete result for ${publicId}:`, result.result);
    }
  } catch (error) {
    console.error(`[Cloudinary] Failed to delete ${publicId}:`, error.message);
  }
};

module.exports = { uploadImage, deleteImage };