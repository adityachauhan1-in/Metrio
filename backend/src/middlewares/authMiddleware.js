//  1 >>  Frontend sends request with header:
// Authorization: Bearer <JWT_TOKEN>
// 2 >> Middleware:
// Extracts token
// Verifies token using JWT_SECRET
// Decodes user info
// Attaches user info to req.user
// 3>>  If token invalid → block request
import jwt from "jsonwebtoken";
const authMiddleware = (req,res,next) => {
    //  1 >> Read Authorization Header  ->( frontend send this header )

    const authHeader = req.headers.authorization;//token come from
    if(!authHeader || !authHeader.startsWith("Bearer ")){
       return  res.status(401).json({message : "No token , authorization denied"})
    }

// 2 >> Extracts token 
const token = authHeader.split(" ")[1];// start with index 1, the token look like "Bearer eyJhbGciOiJIUzI1NiIs..."
try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET); // verify token 
    req.user = decoded ; // decoded returns = email , id 
    next();
    
} catch (error) {

    return res.status(401).json({message : error.message})
}
}

export default authMiddleware;