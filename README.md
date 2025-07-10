# antes de inciar el proyecto ver documento Actualizar node  para realizar la instalacion 
 crear una carpeta Back 
1. dentro de la carpeta back uso el comando 
2.  npm init --yes para inicializar mi proyecto 
2.1 se creara el paquete json

3. instalar las dependencias a usar 
# Dependencias fundamentales
* npm i express:Es el framework web más popular para Node.js. Proporciona una estructura sólida para crear aplicaciones web y API RESTful. Te permite definir rutas, manejar solicitudes HTTP, y mucho más.
* npm i nodemon: Esta herramienta es esencial en el desarrollo. Automatiza el reinicio del servidor cada vez que se guardan cambios en el código, lo que agiliza el proceso de desarrollo.

# Manejo de Datos y Base de Datos:
* npm i mongodb: Es una base de datos NoSQL, altamente escalable y flexible. Se utiliza para almacenar datos estructurados y no estructurados de manera eficiente.
* npm i mongoose: Es un Object Document Mapper (ODM) para MongoDB. Proporciona una interfaz más amigable para interactuar con la base de datos, modelando los datos como objetos de JavaScript.
* npm i fs-extra: Amplía las funcionalidades del módulo fs de Node.js, ofreciendo métodos más convenientes para trabajar con el sistema de archivos, como copiar directorios, mover archivos, etc.

# Seguridad y Autenticación:
* npm i bcryptjs: Se utiliza para hashear contraseñas de manera segura. Evita almacenar contraseñas en texto plano, lo que las hace más resistentes a ataques.
* npm i jsonwebtoken:Permite generar y verificar tokens JWT (JSON Web Tokens), que se utilizan comúnmente para implementar autenticación y autorización en aplicaciones web.
* npm i cors: Gestiona las políticas de CORS (Cross-Origin Resource Sharing), permitiendo que aplicaciones de diferentes orígenes se comuniquen entre sí. Es esencial para aplicaciones que interactúan con front-ends en diferentes dominios.

# Utilidades y Herramientas:
* npm i dotenv: Carga variables de entorno desde un archivo .env, lo que permite mantener las credenciales y configuraciones sensibles fuera del control de versiones.
* npm i multer: Se utiliza para manejar el envío de archivos a través de formularios HTML. Es útil para implementar funcionalidades de carga de imágenes, archivos, etc.
* npm i morgan: Es un middleware de Express que registra las solicitudes HTTP que llegan al servidor. Es útil para depurar y monitorear el tráfico de la aplicación.

4. Luego de instalar las dependencias a la altura de mi package.json creo una carpeta que sera la que contendra de forma organizada todo mi back esta carpeta en desarrollo se le llama src lo que significa fuente en español y se usa especificamente para almacenar el codigo fuente de mi proyecto

5. Dentro de mi carpeta src creo tres archivos
* index.js
* servidor.js
* conexion.js

# servidor.js: 
6. dentro de este archivo 
* import express from "express"; para realizar la conexion con el servidor 
* import morgan from"morgan"; Es útil para depurar y monitorear el tráfico de la aplicación. usando el dev

* ingreso el siguiente codigo 
const servidor = express(); para realizar la conexion con la constante servidor 
servidor.use(morgan("dev"));
servidor.use(express.json());
servidor.get('/', (solicitud, respuesta)=>{
    respuesta.status(404).send("No encontrado");
}); por si no encuentra la conexion me enviara esta respuesta 

export default servidor;

# index.js 
7. import servidor  from "./servidor.js";
* servidor.listen(3000, ()=>{
    console.log("El servidor se esta escuchando en el link http://localhost:3000")
});
* indicamos que el servidor esta escuchando en el puerto 3000

# package.json
8. cambio la ruta de conexion en el package.json para poder conectarme con morgan para poder realizar las depuraciones automaticamente a mi codigo 
* en el main pongo la ruta del src/index.js
* en los scripts  agrego el objeto "start" de la siguiente manera:  "start": "node src/index.js", creo un nuevo objeto llamado dev y uso nodemon mas la ruta del main de la siguiente forma "dev": "nodemon src/index.js",
* dentro de los keywords creo un objeto llamado type indicando que voy a usar module

# Probar la conexion

9. en la terminal ingreso el comando npm run dev para probar la conexion 
* dentro de la consola me debe devolver esta respuesta 
> back@1.0.0 dev
> nodemon src/index.js
[nodemon] 3.1.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/index.js`
El servidor se esta escuchando en el link http://localhost:3000

10. luego de establecer la conexion procedemos a crear la base de datos en este caso se trabajara con mongo DB 

11. luego de hacer los paso del archivo word y tener copiado nuestro codigo a las bases de datos hacemos lo siguiente 
 
12. creamos un archivo .env a la misma altura de mi package.json

# .env
13. dentro del archivo .env creo una variable de entorno que va a contener la ruta que copie en mongoDB en este caso mi variable de entorno se llama RUTA_BASE

# conexion.js
14. ingreso el siguiente codigo 
import mongoose from "mongoose";
mongoose

.connect(process.env.RUTA_BASE)
.then((dato)=>{
    console.log("esta conectado a la base de datos");

}).catch((error)=>{
    console.log("no se conecto a la base de datos");
});

# index.js
15. modifico mi archivo index.js en sus primeras lineas agregando las importanciondes de dotenv import "dotenv/config"; para que podamos leer la ruta de nuestra variable de entorno 
* importo la conexion a la v=base de datos que esta en mi archivo llamado conexion.js import "./conexion.js"
* ahora el mensaje en mi consola cambiara al siguiente 
[nodemon] restarting due to changes...
[nodemon] starting `node src/index.js`
El servidor se esta escuchando en el link http://localhost:3000
esta conectado a la base de datos
* esto nos indica que estamos conectado a nuestra base de datos de manera correcta si presentas errores en este punto revisa tu codigo con base a los pasos anteriores antes de seguir con los siguientes pasos 

# src
16. dentro de nuestro archivo src creamos tres carpetas
* models
* controllers
* routes

# models 
17. dentro de mi carpeta models vamos a ingresar los modelos que necesitemos en este caso lo haremos con un modelo de usuarios y un modelo de productos en donde ingresaremos el esquema de que datos se recibiran en la base de datos 
* creamos un archivo para el modelo de usuarios

# modelUser.js
18. ingreso el siguiente codigo el cual creara un esquema con una coleccion de datos que seran los que almacenara nuestra base de datos el esquema se puede modificar segun la nesecidad del usuario

* import { Schema, model } from 'mongoose';

const schemaUser = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default model('User', schemaUser);

* lo mismo para los demas modelos a usar segun las necesidades del usuario final 

# controllers
19. dentro de mi carpeta controllers creo mis controladores en este ejemplo se indicara para usuarios y los demas controladores a crear dependerar de la necesidad del usuario final 

* import bcrypt from 'bcryptjs'; para encriptar la contraseña 
import modelUser from '../models/modelUser.js'; para obtener el esquema creado 

* creo los metodos que pertenecen al CRUD

# routes
20. organizo mi enrutamiento 
* import { Router } from 'express';
import ControladorUsuarios from '../controladores/controladorUsuarios.js';

const enrutadorUsuarios = Router();

enrutadorUsuarios.post('/', ControladorUsuarios.crearUsuario);
enrutadorUsuarios.get('/:id', ControladorUsuarios.leerUsuario);
enrutadorUsuarios.get('/', ControladorUsuarios.leerUsuarios);
enrutadorUsuarios.put('/:id', ControladorUsuarios.actualizarUsuario);
enrutadorUsuarios.delete('/:id', ControladorUsuarios.eliminarUsuario);

export default enrutadorUsuarios;

# servidor.js
21. en el servidor importo path: me ayuda a trazar el camino a seguir de los enrutamientos 
* importo cors: permitiendo que aplicaciones de diferentes orígenes se comuniquen entre sí.
importo los enrutamientos que creee en las rutas y los activo en el con ayuda del servidor que es express
* servidor.use(cors());
servidor.use(morgan("dev"));
servidor.use(express.json());
servidor.use('/productos',enrutadorProductos);
servidor.use('/usuarios',enrutadorUsuarios);
servidor.use('/inicio-sesion',enrutadorInicioSesion);
servidor.use('/imagenes', express.static(path.resolve(`imagenes`)));


22. Luego realizo la prueb en postman con cada uno de los metodos para el crud
# RUTA EN POSTMAN
* POST http://localhost:3000/users
* GET http://localhost:3000/users
* GET http://localhost:3000/users/idgenerado
* PUT http://localhost:3000/users/idamodificar 
* DELETE http://localhost:3000/users/idaeliminar


## PASANDO AL FRONT 
1. fuera del back en mi carpeta del poryecto instalo el cli de angular con el comando npm install -g @angular/cli
2. mirar la version ng version
3. crear el nuevo poryecto ng new front, la primera opcion y(yes) y luego el primer css recomendado y luego y(yes)
4. instalar las dependencias a usar
npm i bootstrap@5.3.7
npm i bootstrap-icons
npm i cors: sirve como puente desde el servidor 4200 al servidor 3000
npm i ngx-toastr: mostrar notificaciones tipo toast o pop-up

## CREACION DE COMPONENTES
5. ng generate component components/nombre-del-componente  == ng g c components/nombre-del-componente
home, navigation, login,register, page-not-found

6. visualizar desde el navegador ng serve -o = 4200
ng serve --port 4201
ng s= 4200

7. app.html 
* Este es el componente raiz de la aplicacion aqui podemos poner la informacion que queremos que se visualice en nuesta primera pagina 
* este componente tiene un diseño por defecto alli podemos borrar todo ese diseño previo y solo dejar <router-outlet /> como nos lo indica el archivo 
* como el primero que quiero poner es el nav voy a ir a navigation.ts y luego copio el nombre del  selector: 'app-navigation', luego voy a mi archivo app.html y pego la ruta de la siguiete forma <app-navigation/> luego realizo la prueba para ver si el app.html muestra los datos del navigation.html, en la consola pongo el comando ng serve -o  || ng s || ng s -o




