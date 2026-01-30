import StationModel from "../models/StationModel.js"
// for calculation of the fare . 
export const calculateFare = async(req,res) => {
try {
    const {from , to } = req.body ; 
            
    const fromStation = await StationModel.findOne({name : from})
    const toStation = await StationModel.findOne({name : to})

    if(!fromStation || !toStation){
         return res.status(400).json({message : "Invalid Coupon "})
    }
    const distance = Math.abs(toStation.distance - fromStation.distance);

    const baseFare = 10 ; 
    const fareperKm = 2 ; // in rupess 

    const fare = baseFare + distance*fareperKm;
    res.json({
        distance : distance.toFixed(1),
        fare : Math.round(fare)

    })
}
catch {
    console.log("value put karo ")
 return res.status(500).json({message : err.message})
}
}

// export const 