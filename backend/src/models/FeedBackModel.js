import mongoose from "mongoose";

const feedBackSchema = mongoose.Schema({
    user : {
        // store the user Id from the database. 
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,

    },
    message : {
     type : String ,
        required : true,
        minlength : 5 ,
        maxlength : 1000
    },
    adminReply: {
        type: String,
        default: null,
        maxlength: 500
    },
    category :
    {
        type: String,
        enum: ["technical", "service", "suggestion", "complaint", "other"],
        required: true
    },
    status: {
        type: String,
      enum: ["open", "resolved", "reviewed"],
        default: "open"
    }
},  
{timestamps : true}
)
export default mongoose.model("Feedback",feedBackSchema)