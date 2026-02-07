import FeedBackModel from "../models/FeedBackModel.js";

export const createFeedBack = async(req , res) => {
    try {
        // extract the message and category
        const {message , category} = req.body;
        if(!message || !category){
            return res.status(400).json({message : "message or category can not be empty"})
        }
    // create feedback 
    const feedback = await FeedBackModel.create({
      user: req.user.id,
      message,
      category,
    });
    return res.status(201).json({ success: true, message: "Feedback submitted successfully", data: feedback });

    } catch (error) {
      console.error("Create feedback error:", error);
      return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}