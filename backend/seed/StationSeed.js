import mongoose from "mongoose";
import dotenv from "dotenv"
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import StationModel from "../src/models/StationModel.js";

// Get the directory path for ES modules
// it shows error because it tries to find the .env in current directory but it is in root directory 
// so we use them 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from the backend root directory (parent of seed directory)
dotenv.config({ path: join(__dirname, "..", ".env") });

const stations = [
    { name: "Meerut South", distance: 0 },
    { name: "Shatabdi Nagar", distance: 2.5 },
    { name: "Partapur", distance: 5.2 },
    { name: "Rithani", distance: 7.1 },
    { name: "Brahmapuri", distance: 9.7 },
    { name: "Lal Kurti", distance: 12.4 },
    { name: "Meerut Cantonment", distance: 15.0 },
    { name: "Begumpul", distance: 17.8 },
    { name: "Alamgirpur", distance: 20.0 },
    { name: "Bahchaula", distance: 3.6},
    { name: "Nangla", distance: 5.2},
    { name : "Sikhera", distance : 1.5}
  ];

  const seedStation = async() => {
    console.log("====StationSeed.js====")
   
     try {
     await mongoose.connect(process.env.MONGO_URI)
     console.log("MongoDB Connected for seeding")
       await StationModel.deleteMany()
    await StationModel.insertMany(stations)
     console.log("Station seeded successfully")
    await mongoose.connection.close()
    process.exit(0); 
        
    } catch (error) {
      console.log("PORT : ->>>" , process.env.PORT);
      console.log("JWT conection is : => > " ,process.env.JWT_SECRET);
  console.log("THE REAL ERROR IS IN MONGODB I THINK IT IS NOT UPDATED SO GO TO MONGODB ATLAS")
       console.log(error)
       await mongoose.connection.close()
       process.exit(1); 
    } 
  }

  seedStation();