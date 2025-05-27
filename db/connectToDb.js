const { default: mongoose } = require('mongoose');

require('dotenv').config();



module.exports= async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to database");
    } catch (e) {
        console.log("Error connecting to database");
        
    }
}


