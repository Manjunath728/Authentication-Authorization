require('dotenv').config();
    const express = require('express')
    const app=express();
    const cors = require('cors')
    

    //midlewares
    app.use(cors());
    app.use(express.json())
    

    //routers

    //register and login

    app.use("/auth",require("./routes/jwtAuth"))

// dashboard 

    app.use("/dashboard",require("./routes/dashboard"))
    // port info 
    const port = process.env.PORT ;
    app.listen(port,()=>{
        console.log(`server started at port ${port}`);
    });