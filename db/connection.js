// import mongoose from 'mongoose'

// let dbconnection=async(dbURL,dbName)=>{
//   try {
//     await mongoose.connect(dbURL+dbName)
//     console.log(`connected to db successfully`)
//   } catch (error) {
//     console.log(`error occurred while connecting to DB`)
//   }
// }

// export default dbconnection










import mongoose from "mongoose";

const dbConnect = async (DBURL, DBNAME) => {
  try {
    console.log("Connecting to DB:", DBURL, DBNAME); // Debugging
    await mongoose.connect(DBURL, {
      dbName: DBNAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error occurred while connecting to DB:", error.message);
    process.exit(1);
  }
};

export default dbConnect;





// const dbConnect = async (dbURL, dbName) => {
//   try {
//     await mongoose.connect(`${dbURL}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log(`✅ Connected to DB successfully`);
//   } catch (error) {
//     console.error(`❌ Error connecting to DB:`, error);
//   }
// };
// export default dbConnect;