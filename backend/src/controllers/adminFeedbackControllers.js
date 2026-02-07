import FeedBackModel from "../models/FeedBackModel.js";

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await FeedBackModel.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email");
    return res.status(200).json({ success: true, data: feedbacks });
  } catch (error) {
    console.error("Get all feedback error:", error);
    return res
      .status(500)
      .json({ message: "Error fetching feedback", error: error.message });
  }
};

export const reviewFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminReply } = req.body;

    const updates = {};
    if (status) {
      if (!["open", "resolved", "reviewed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      updates.status = status;
    }
    if (adminReply !== undefined) updates.adminReply = adminReply;

    const feedback = await FeedBackModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate("user", "name email");

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    return res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    console.error("Review feedback error:", error);
    return res
      .status(500)
      .json({ message: "Error updating feedback", error: error.message });
  }
};
