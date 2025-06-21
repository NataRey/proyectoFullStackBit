import express from "express";// para realizar la conexion con el servidor 
import morgan from "morgan";//monitorear solicitudes http

const servidor = express();
servidor.use(morgan("dev"));
servidor.use(express.json());

servidor.get('/',(sol , res)=>{
    res.status(404).send("No encontrado");

});

export default servidor;
