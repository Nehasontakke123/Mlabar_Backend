// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import dbConnect from './db/connection.js';
// import productsRoute from './routers/productsRoute.js';

// dotenv.config(); 

// const app = express();
// const port = process.env.PORT || 6000;

// // Database Connection
// dbConnect(process.env.DBURL, process.env.DBNAME);

// // Middleware
// app.use(cors());
// app.use(express.json()); 
// app.use("/uploads", express.static("uploads")); 

// // Routes
// app.use('/product', productsRoute);

// app.listen(port, () => {
//     console.log(`Server started at port ${port}`);
// });






import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './db/connection.js';
import productsRoute from './routers/productsRoute.js';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 6000;

// Database Connection
dbConnect(process.env.DBURL, process.env.DBNAME);

// Middleware
app.use(cors());
app.use(express.json()); 
app.use("/uploads", express.static("uploads")); 

// Routes
app.use('/product', productsRoute);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});