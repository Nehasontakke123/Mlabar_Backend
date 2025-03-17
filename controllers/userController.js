import { createUser,getUser } from "../services/userService.js";
import { hashPasswordFun,validatePassword } from "../helper/encryption.js";
import { getToken,verifyToken } from "../auth/jwtToken.js";



export let getProfile = async (req, res) => {
    console.log("Headers received:", req.headers); // 🔍 Debugging

    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    let tokenParts = req.headers.authorization.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(400).json({ error: "Invalid token format. Use 'Bearer token'" });
    }

    let token = tokenParts[1];

    try {
        let flag = verifyToken(token, req.params.email);
        if (flag) {
            let user = await getUser(req.params.email);
            let data = { name: user.name, email: user.email, mobile: user.mobile };
            res.status(200).json(data);
        } else {
            res.status(403).json({ error: "Forbidden: Invalid token" });
        }
    } catch (error) {
        console.error("Error in getProfile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




export let userLogin = async (req, res) => {
    let { email, password } = req.body;

    try {
        let user = await getUser(email);

        // Check if user exists
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        let flag = await validatePassword(password, user.password);

        if (flag) {
            let token = getToken({ email });
            let resData = { token, msg: "User login successfully" };
            res.status(200).json(resData);
        } else {
            res.status(400).json({ msg: "Invalid password" });
        }
    } catch (error) {
        console.error("Error in userLogin:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};



export let register=async(req,res)=>{
    let {name,mobile,email,password}=req.body
    console.log(req.body);
    try {
        let hashPassword =await hashPasswordFun(password)
        let status=await createUser({name,mobile,email,password:hashPassword}) 
        if(status=="success"){
            res.send("success")
        }else{
            res.send("error")
        }
       
    } catch (error) {
        console.log(error);
    }
}



