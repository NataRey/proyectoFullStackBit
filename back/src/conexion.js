import mongoose from "mongoose";
mongoose

.connect(process.env.MONGODB)
.then((dato)=>{
    console.log("esta conectado a la base de datos");
}).catch((error)=>{
    console.log("no se conecto a la base de datos");
});