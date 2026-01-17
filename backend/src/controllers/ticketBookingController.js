import express from 'express'
import TicketModel from '../models/TicketModel.js'
import StationModel from '../models/StationModel.js'

export const ticketBooking = async(req,res) => {
  try {
      //  ===1 >> extract from , to and journeyType from the req.body 
        const {from , to , journeyType} = req.body ; 
        console.log("REQ.USER =>", req.user);

        const userId  = req.user.id;

        // Check if user has already active ticket
        const statusTest = await TicketModel.findOne({
          user : userId,
          status : "active"
        })
        if(statusTest){
          console.log("DB expiresAt:", statusTest.expiresAt);
console.log("Now:", new Date());
console.log("Is expired:", statusTest.expiresAt < new Date());

          // if active ticket exist , check expiry (if it is expire so we mark it expire before booking new )
          if(statusTest.expiresAt < new Date()){
       // mark it expiry first 
            statusTest.status  = "expire"
            await statusTest.save();
          } else {
            // if the ticket is active but  it is not expired (so we can not marked it expired) 
            return res.status(400).json({message : "You have already an active ticket "})
        }
      }
      // set Expiry time of the ticket
      const expiresAt  = new Date(Date.now() + 90 * 60 * 1000);
    // Validate Input 
    if(!from || !to){
      return res.status(400).json({message : "From and To stations are required "});
    }
      // if both are same 
      if(from === to){
        return res.status(400).json({message : "From and To stations cannot be same "});
      }

      // Fetch Stations 
      const fromStation = await StationModel.findOne({name : from});
      const toStation = await StationModel.findOne({name : to});
     
      // Validate statiosns
      if(!fromStation || !toStation){
        return res.status(400).json({message : "Invalid Station Selected"})
      }

      // Calculate Distance 
      const distance  = Math.abs(toStation.distance - fromStation.distance);

      // fare Calculation 
      const basefare = 10 ; 
      const fareperKm = 2 ; 
 let fare = basefare + distance * fareperKm;

 if(journeyType === "return"){
  fare = fare  * 2 ; 
 }

 // qrCode Data 
 const qrCode  = `USER:${userId}|FROM:${from}|TO:${to}|FARE:${fare}|TIME:${Date.now()}`;
 // save ticket 

 const ticket = await TicketModel.create({
  user : userId , 
  from , to , journeyType ,distance,
  qrCode , fare , expiresAt
 })
 // saved successfully  
 return res.status(201).json({message : "Ticket booked successfully " , ticket});
  } catch (error) {
    
    return res.status(500).json({error : error.message , message : "what the nonsense is this"});
  }
}