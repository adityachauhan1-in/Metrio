import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
    name :
     {
    "type" : String,
    "required" : true,
    "unique" : true    },
distance : {
    "type" : Number ,  // from starting station in KM 
    "required" : true
}

})
export default mongoose.model("Station",stationSchema);