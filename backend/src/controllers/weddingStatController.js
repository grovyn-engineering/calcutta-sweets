const { prisma } = require('../lib/prisma');

const getMany = async (req, res) => {
  try {
    const data = await prisma.weddingStat.findMany();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching data" });
  }
};

const createOne = async (req, res) => {
  try {
    const { label, value } = req.body;
    const item = await prisma.weddingStat.create({ data: { label: label || "", value: value || "" } });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating item" });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, value } = req.body;
    const updated = await prisma.weddingStat.update({
      where: { id },
      data: { label, value }
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating" });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.weddingStat.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting" });
  }
};

module.exports = { getMany, createOne, updateOne, deleteOne };
