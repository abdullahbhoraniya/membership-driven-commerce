import app from "./app.js";
import { config } from "./utils/config.js";

import connectDb from "./utils/db.connection.js";


const PORT=config.port || 5000;

const DBconnect=async()=>{
    const connection=await connectDb();
}


app.listen(PORT,()=>{
    DBconnect();
    console.log(`Server is running on http://localhost:${PORT}`);
});
