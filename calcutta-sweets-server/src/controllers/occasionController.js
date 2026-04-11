const { prisma } = require('../lib/prisma');
const { deleteImage } = require('../utils/cloudinary');

const getOccasions = async (req, res) => {
  try {
    const occasions = await prisma.occasion.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: occasions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching occasions" });
  }
};

const createOccasion = async (req, res) => {
  try {
    const { title, imageUrl, cloudinaryPublicId } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const newOccasion = await prisma.occasion.create({
      data: {
        title,
        imageUrl: imageUrl || "",
        publicId: cloudinaryPublicId || ""
      }
    });

    res.status(201).json({ success: true, data: newOccasion });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating occasion" });
  }
};

const updateOccasion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl, cloudinaryPublicId } = req.body;

    const existingOccasion = await prisma.occasion.findUnique({ where: { id } });

    if (!existingOccasion) {
      return res.status(404).json({ success: false, message: "Occasion not found" });
    }

    let oldImageToDelete = null;

    if (existingOccasion.publicId) {
      if (cloudinaryPublicId && existingOccasion.publicId !== cloudinaryPublicId) {
        oldImageToDelete = existingOccasion.publicId;
      } else if (!cloudinaryPublicId && existingOccasion.publicId && imageUrl === "") {
        oldImageToDelete = existingOccasion.publicId;
      }
    }

    const updatedOccasion = await prisma.occasion.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existingOccasion.title,
        imageUrl: imageUrl !== undefined ? imageUrl : existingOccasion.imageUrl,
        publicId: cloudinaryPublicId !== undefined ? cloudinaryPublicId : existingOccasion.publicId
      }
    });

    if (oldImageToDelete) {
      deleteImage(oldImageToDelete);
    }

    res.json({ success: true, data: updatedOccasion });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating occasion" });
  }
};

const deleteOccasion = async (req, res) => {
  try {
    const { id } = req.params;

    const occasion = await prisma.occasion.findUnique({ where: { id } });
    if (!occasion) {
      return res.status(404).json({ success: false, message: "Occasion not found" });
    }

    await prisma.occasion.delete({ where: { id } });

    if (occasion.publicId) {
      deleteImage(occasion.publicId);
    }

    res.json({ success: true, message: "Occasion deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting occasion" });
  }
};

module.exports = { getOccasions, createOccasion, updateOccasion, deleteOccasion };
