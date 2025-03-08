import mongoose from 'mongoose'

let dbconnection=async(dbURL,dbName)=>{
  try {
    await mongoose.connect(dbURL+dbName)
    console.log(`connected to db successfully`)
  } catch (error) {
    console.log(`error occurred while connecting to DB`)
  }
}

export default dbconnection




// const dbConnect = async (dbURL, dbName) => {
//   try {
//     await mongoose.connect(`${dbURL}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log(`✅ Connected to DB successfully`);
//   } catch (error) {
//     console.error(`❌ Error connecting to DB:`, error);
//   }
// };
// export default dbConnect;