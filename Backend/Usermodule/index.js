const express = require('express');
const cors = require('cors');



const connectDB = require('./src/databse/db');
// Custom CORS configuration
const corsOptions = {
    origin: '*',  // Replace with your frontend URL or an array of URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  };
//const userRoutes = require('./routes/userrout');
const employeeRoutes = require('./src/routes/employeeRoutes');  //change
require('dotenv').config();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

connectDB();

//app.use('/api',userRoutes);
app.use('/api', employeeRoutes);   //changes


const PORT = process.env.PORT || 5001;
app.listen(PORT,() => console.log(`server running on port ${PORT}`));


