require('dotenv').config(); 

const express = require('express');
const connectToDb = require('./db/connectToDb'); 
const bookRoutes = require('./routes/bookRoutes'); 

const app = express();

connectToDb()
app.use(express.json());


app.use('/api/books', bookRoutes);



 



app.listen(5040, () => {
    console.log(`Server is running on http://localhost:5040`);
  });


