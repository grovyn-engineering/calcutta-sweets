const { prisma } = require('../lib/prisma');

const getMany = async (req, res) => {
  try {
    const data = await prisma.testimonial.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching testimonials' });
  }
};

const createOne = async (req, res) => {
  try {
    const { quote, name, title, sortOrder } = req.body;
    const item = await prisma.testimonial.create({
      data: {
        quote: quote || '',
        name: name || '',
        title: title || '',
        sortOrder: sortOrder ?? 0,
      },
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating testimonial' });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { quote, name, title, sortOrder } = req.body;
    const updated = await prisma.testimonial.update({
      where: { id },
      data: { quote, name, title, sortOrder },
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating testimonial' });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.testimonial.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting testimonial' });
  }
};

module.exports = { getMany, createOne, updateOne, deleteOne };
