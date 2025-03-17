import bcrypt from 'bcrypt'

export let hashPasswordFun=async(origPass)=>{
  try {
    let hashPass = await bcrypt.hash(origPass,8)
    return hashPass
  } catch (error) {
    console.log(error)
  }
}


export let validatePassword=async(origPass,hashPass)=>{
  try {
    let flag= await bcrypt.compare(origPass,hashPass)
    return flag
  } catch (error) {
    console.log(error)
  }
}