import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import User from '../models/UserModel.js'
// it works only for the login user if the user give corrct secret but it is stroed in env so 
//  our fronted is also unknown from it . only developer tells the owner this secret. 
const router = express.Router();

router.post("/admin",authMiddleware, async(req,res) =>{

    const {secret} =  req.body;
    if(secret !== process.env.ADMIN_SECRET){
     return res.status(403).json({message : "Invalid Admin Secret"})
    }

    // secret is matched so now update the role 
    await User.findByIdAndUpdate(req.user.id , {role : "admin"})
res.json({message : "Congrats !  You are Admin now ."})
})
export default router;