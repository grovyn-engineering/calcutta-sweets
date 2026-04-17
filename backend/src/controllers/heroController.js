const { prisma } = require('../lib/prisma');
const { deleteImage } = require('../utils/cloudinary');

const getMany = async (req, res) => {
  try {
    const data = await prisma.heroSection.findMany();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching data" });
  }
};

const createOne = async (req, res) => {
  try {
    const { title, subtitle, imageUrl, cloudinaryPublicId } = req.body;
    const item = await prisma.heroSection.create({
      data: { title: title || "", subtitle: subtitle || "", imageUrl: imageUrl || "", publicId: cloudinaryPublicId || "" }
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating item" });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, imageUrl, cloudinaryPublicId } = req.body;
    
    const existing = await prisma.heroSection.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: "Not found" });

    let oldImageToDelete = null;
    if (existing.publicId) {
      if (cloudinaryPublicId && existing.publicId !== cloudinaryPublicId) oldImageToDelete = existing.publicId;
      else if (!cloudinaryPublicId && existing.publicId && imageUrl === "") oldImageToDelete = existing.publicId;
    }

    const updated = await prisma.heroSection.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        subtitle: subtitle !== undefined ? subtitle : existing.subtitle,
        imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
        publicId: cloudinaryPublicId !== undefined ? cloudinaryPublicId : existing.publicId
      }
    });

    if (oldImageToDelete) deleteImage(oldImageToDelete);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating" });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.heroSection.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: "Not found" });

    await prisma.heroSection.delete({ where: { id } });
    if (existing.publicId) deleteImage(existing.publicId);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting" });
  }
};

module.exports = { getMany, createOne, updateOne, deleteOne };