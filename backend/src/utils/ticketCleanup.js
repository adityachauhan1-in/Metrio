import TicketModel from "../models/TicketModel.js";

export const autoExpireTicket = async () => {
    try {
        const result = await TicketModel.updateMany({
            status : "active",
            expiresAt : { $lt : new Date()} // if expire time is ($lt -> lesser then ) new time .   
        } ,{
     $set   : {  status:"expire"}  } // set the status of ticket to expire
      )
      console.log(`Expired ${result.modifiedCount} old ticket`)
      return result // it is return to the MONGODb 
    } catch (error) {
        return res.status(500).json({error : error.message})  
    }
}