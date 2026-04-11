const { prisma } = require('../lib/prisma');

const getOne = async (req, res) => {
  try {
    const data = await prisma.contactInfo.findFirst();
    res.json({ success: true, data: data || null });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching" });
  }
};

const updateOne = async (req, res) => {
  try {
    const { address, phone, email, description } = req.body;
    const existing = await prisma.contactInfo.findFirst();

    const updated = await prisma.contactInfo.upsert({
      where: { id: existing?.id || "nonexistent" },
      update: { address, phone, email, description },
      create: { address, phone, email, description: description || "" },
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating" });
  }
};

module.exports = { getOne, updateOne };
