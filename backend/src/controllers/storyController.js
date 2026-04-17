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

const pick = (body, existing, key) =>
  body[key] !== undefined ? body[key] : existing?.[key];

const updateOne = async (req, res) => {
  try {
    const body = req.body;
    const {
      title,
      content,
      imageUrl,
      cloudinaryPublicId,
    } = body;

    const existing = await prisma.story.findFirst();

    let oldImageToDelete = null;
    if (existing?.publicId) {
      if (cloudinaryPublicId && existing.publicId !== cloudinaryPublicId) oldImageToDelete = existing.publicId;
      else if (!cloudinaryPublicId && existing.publicId && imageUrl === "") oldImageToDelete = existing.publicId;
    }

    let oldCraftImageToDelete = null;
    if (existing?.craftPublicId) {
      const nextCraftPid = body.craftPublicId;
      if (nextCraftPid !== undefined && nextCraftPid !== existing.craftPublicId) oldCraftImageToDelete = existing.craftPublicId;
      else if (nextCraftPid === "" && existing.craftPublicId) oldCraftImageToDelete = existing.craftPublicId;
    }

    const updatePayload = {
      title: title !== undefined ? title : existing?.title,
      content: content !== undefined ? content : existing?.content,
      imageUrl: imageUrl !== undefined ? imageUrl : existing?.imageUrl,
      publicId: cloudinaryPublicId !== undefined ? cloudinaryPublicId : existing?.publicId,
      heroEyebrow: pick(body, existing, 'heroEyebrow'),
      craftOverline: pick(body, existing, 'craftOverline'),
      craftHeadline: pick(body, existing, 'craftHeadline'),
      craftImageUrl: pick(body, existing, 'craftImageUrl'),
      craftPublicId: pick(body, existing, 'craftPublicId'),
      craftSteps: pick(body, existing, 'craftSteps'),
      timelineTitle: pick(body, existing, 'timelineTitle'),
      timelineSubtitle: pick(body, existing, 'timelineSubtitle'),
      familySectionTitle: pick(body, existing, 'familySectionTitle'),
      familyMembers: pick(body, existing, 'familyMembers'),
      quoteText: pick(body, existing, 'quoteText'),
      quoteAttribution: pick(body, existing, 'quoteAttribution'),
    };

    const updated = existing
      ? await prisma.story.update({ where: { id: existing.id }, data: updatePayload })
      : await prisma.story.create({
          data: {
            title: title || "",
            content: content || "",
            imageUrl: imageUrl || "",
            publicId: cloudinaryPublicId || "",
            heroEyebrow: body.heroEyebrow ?? null,
            craftOverline: body.craftOverline ?? null,
            craftHeadline: body.craftHeadline ?? null,
            craftImageUrl: body.craftImageUrl ?? null,
            craftPublicId: body.craftPublicId ?? null,
            craftSteps: body.craftSteps ?? undefined,
            timelineTitle: body.timelineTitle ?? null,
            timelineSubtitle: body.timelineSubtitle ?? null,
            familySectionTitle: body.familySectionTitle ?? null,
            familyMembers: body.familyMembers ?? undefined,
            quoteText: body.quoteText ?? null,
            quoteAttribution: body.quoteAttribution ?? null,
          },
        });

    if (oldImageToDelete) deleteImage(oldImageToDelete);
    if (oldCraftImageToDelete) deleteImage(oldCraftImageToDelete);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating" });
  }
};

module.exports = { getOne, updateOne };
