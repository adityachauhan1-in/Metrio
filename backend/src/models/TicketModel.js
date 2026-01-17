// for booking the ticket user need to login 
import mongoose, { trusted }  from "mongoose";

const ticketSchema = new mongoose.Schema(  {
   
 user :  {
 type : mongoose.Schema.Types.ObjectId,
 required : true,
 ref : "User"
 },

 from : {
    type : String,
    required : true,
},
to : {
    type : String , 
    required : true
},

distance : {
    type : Number,
    required : true
} , 

fare : {
    type : Number,
    required: true
},
journeyType : {
    type : String ,
    enum : ["single" ,"return"],
    default : "single"
},
qrCode : {
    type : String , //here we store our qr_data as string, we will convert this into code while working on fronted . 
    required : true 
},
status : {
    type : String , 
    enum : ["active" , "used","expire"],
    default : "active"
},
expiresAt : {
    type : Date ,
    required : true
},

usedAt : {
    type : Date,
    default : null
}
},
{timestamps:true},
  )
  export default mongoose.model("Ticket",ticketSchema);