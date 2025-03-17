import jwt from 'jsonwebtoken'

export let getToken=(payload)=>{
    let token=jwt.sign(payload,process.env.PRIVATEKEY)
    console.log(token);
    return token
}

export const verifyToken=async(token,email)=>{
  try {
    let payload=await jwt.verify(token,process.env.PRIVATEKEY)
    console.log(`pay load is ${payload.email}`);
    if(payload.email==email){
        return true
    }else{
        return false
    }
  } catch (error) {
    
  }
}

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.user = user;
    next();
  });
};
