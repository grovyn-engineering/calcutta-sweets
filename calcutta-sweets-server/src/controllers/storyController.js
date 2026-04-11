const { prisma } = require('../lib/prisma');
const { deleteImage } = require('../utils/cloudinary');

const getOne = async (req, res) => {
  try {
    const data = await prisma.story.findFirst();
    res.json({ success: true, data: data || null });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching" });
  }
};

const updateOne = async (req, res) => {
  try {
    const { title, content, imageUrl, cloudinaryPublicId } = req.body;
    const existing = await prisma.story.findFirst();
    
    let oldImageToDelete = null;
    if (existing?.publicId) {
      if (cloudinaryPublicId && existing.publicId !== cloudinaryPublicId) oldImageToDelete = existing.publicId;
      else if (!cloudinaryPublicId && existing.publicId && imageUrl === "") oldImageToDelete = existing.publicId;
    }

    const updated = await prisma.story.upsert({
      where: { id: existing?.id || "nonexistent" },
      update: {
        title: title !== undefined ? title : existing?.title,
        content: content !== undefined ? content : existing?.content,
        imageUrl: imageUrl !== undefined ? imageUrl : existing?.imageUrl,
        publicId: cloudinaryPublicId !== undefined ? cloudinaryPublicId : existing?.publicId
      },
      create: {
        title: title || "",
        content: content || "",
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
