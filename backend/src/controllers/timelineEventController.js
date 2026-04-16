const { prisma } = require('../lib/prisma');

const getMany = async (req, res) => {
  try {
    const data = await prisma.timelineEvent.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching data" });
  }
};

const createOne = async (req, res) => {
  try {
    const { year, title, description } = req.body;
    const item = await prisma.timelineEvent.create({ data: { year: year || "", title: title || "", description: description || "" } });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating item" });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, title, description } = req.body;
    const updated = await prisma.timelineEvent.update({
      where: { id },
      data: { year, title, description }
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating" });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.timelineEvent.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting" });
  }
};

module.exports = { getMany, createOne, updateOne, deleteOne };
