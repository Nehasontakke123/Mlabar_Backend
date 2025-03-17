import { createUser,getUser } from "../services/userService.js";
import { hashPasswordFun,validatePassword } from "../helper/encryption.js";
import { getToken,verifyToken } from "../auth/jwtToken.js";



export let getProfile=async(req,res)=>{
    let email=req.params.email
    let token=req.headers.authorization.split(" ")[1]
    console.log(token)
    try {
        let flag=verifyToken(token,email)
        if(flag){
            let user=await getUser(email)
        let data={name:user.name,email:user.email,mobile:user.mobile}
        res.status(200).json(data)
        }
        
    } catch (error) {
        res.status(500).send("error occured")
    }
}


export let userLogin=async(req,res)=>{
    let {email,password}=req.body
    try {
        let user=await getUser(email)
        let flag=await validatePassword(password,user.password)
        if(flag){
            let token = getToken({email})
            let resData={token,"msg":"user login successfully"}
            // res.status(200).send("user login successfully")
            res.status(200).json(resData)
        }
        else{
            res.status(400).send("user login failed")
        }
    } catch (error) {
        res.status(500).send("error in catch block")
        
    }

}


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



