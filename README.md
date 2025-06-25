# proyectoFullStackBit
# npm init --yes 
// inicializa el proyecto 
1. instalar dependencias 
# npm i express: 
este nos permite definir rutas, manejar solicituides Http
# npm i nodemon: 
Automatiza el reinicio de l servidor cada vez que se guardan cambios 
# npm i mongodb 
Es una base de datos noSQL 
# npm i mongoose
Es un hijo de mongoDB que proporciona una interfaz mas amigable para la base de datos 
# npm i fs-extra 
Amplia las funcionalidades del modulo de nodeJs (trabajar con archivos)
# npm i bcryptjs 
Se usa para hashear los password
# npm i jsonwebtoken
nos permite implementar autenticacion y autorizacion en las aplicaciones web 
# npm i cors
nos permie interactuar con diferentes aplciaciones entre si 
# npm i dotenv 
sirve como variable de entorno para guaradas cosas sensibles 
# npm i multer
Se usa para el manejo de archivos ejemplo subir imagenes etc
# npm i morgan 
Es un midlelware de Express y registra las solicituides http 

2. sobre la misma linea de mi package.json  voy a crea una carpeta que sera nuestro src dentro creo 3 archivos index, servidor y conexion 

3. luego de reslizar la configuracion del servidor y el puerto probamos la conexion 
# Probar la conexion

En la terminal ingreso el comando npm run dev para probar la conexion 
* dentro de la consola me debe devolver esta respuesta 
> back@1.0.0 dev
> nodemon src/index.js
[nodemon] 3.1.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/index.js`
El servidor se esta escuchando en el link http://localhost:3000





