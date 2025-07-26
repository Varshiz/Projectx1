import jwt from "jsonwebtoken";
export const verifytoken=async(req,res,next)=>{
    const mytoken=req.cookies.token;
    if(!mytoken){
        return res.status(401).json({
            message:"token not found",
            success:false
        })
    }
    try {
        
        
        await jwt.verify(mytoken,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                console.log(err);
            }
            req.user =user;
            next();
        });
        
    } catch (error) {
        console.log(error);
    }
    
}

export const isAdmin=async(req, res, next)=>{
  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin only" });
  next();
}