    const express = require("express");
    const dotenv = require("dotenv");
    const connectDB = require("./db/connectdb");
    const cookieParser = require("cookie-parser");
    const userRoute = require("./routes/Userroutes");
    const postRoutes = require("../Backend/routes/Postroutes");
    dotenv.config();

    connectDB(); // Establish database connection

    const app = express();
    const PORT = process.env.PORT || 5000;
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());

    //Routes
    app.use("/api/users",userRoute);
    app.use("/api/posts",postRoutes);

    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
