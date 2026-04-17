const { prisma } = require('../lib/prisma');
const { deleteImage } = require('../utils/cloudinary');

const getOne = async (req, res) => {
  try {
    const data = await prisma.specialOrder.findFirst();
    res.json({ success: true, data: data || null });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching" });
  }
};

const updateOne = async (req, res) => {
  try {
    const { title, description, imageUrl, cloudinaryPublicId } = req.body;
    const existing = await prisma.specialOrder.findFirst();
    
    let oldImageToDelete = null;
    if (existing?.publicId) {
      if (cloudinaryPublicId && existing.publicId !== cloudinaryPublicId) oldImageToDelete = existing.publicId;
      else if (!cloudinaryPublicId && existing.publicId && imageUrl === "") oldImageToDelete = existing.publicId;
    }

    const updated = await prisma.specialOrder.upsert({
      where: { id: existing?.id || "nonexistent" },
      update: {
        title: title !== undefined ? title : existing?.title,
        description: description !== undefined ? description : existing?.description,
        imageUrl: imageUrl !== undefined ? imageUrl : existing?.imageUrl,
        publicId: cloudinaryPublicId !== undefined ? cloudinaryPublicId : existing?.publicId
      },
      create: {
        title: title || "",
        description: description || "",
        imageUrl: imageUrl || "",
        publicId: cloudinaryPublicId || ""
      }
    });

    if (oldImageToDelete) deleteImage(oldImageToDelete);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating" });
  }
};

module.exports = { getOne, updateOne };
