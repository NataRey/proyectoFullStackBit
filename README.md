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
* Ver archivo word explicacion paso a paso para crear una base de datos en mongo DB

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

23. para poder recuperar la contrasena instalamos
* npm i randomstring
* npm i nodemailer
hacemos cambios en nuestro controlador y nuestras rutas 

24. en el controlador importo randostring y nodemailer

# como se va a crear un usuario lo mas posible es que necesite loguearme estonces voy a realizar mi controlador de login, mi enrutador y como los datos para el logueo los voy a tomar de algun usuario que ya este registrado entonces voy a tomar el mismo shema de usuario

241. antes de crear mi controlador de inicio de sesion debo crear una funcion para generar un token y otra para verfircar el token esto se realiza con el fin de que cuando el usuario se loguee su sesion no quede abierta por siempre sin dar cerrar sesion sino que tenga un tiempo limite de inactividad 

242. se crea una carpeta dentro del src  que se llame ayudas y dentro creamos un archivo llamado funciones.js
243. dentro del archivo funciones.js
import jwt from 'jsonwebtoken';
export function generarToken(payload) {
  return new Promise((resolver, rechazar) => {
    jwt.sign(payload, 'llave secreta', { expiresIn: '30s' }, (error, token) => {
      if (error) {
        rechazar(error);
      } else {
        resolver(token);
      }
    });
  });
}
export function verificarToken(token) {
  return new Promise((resolver, rechazar) => {
    jwt.verify(token, 'llave secreta', (error, decodificado) => {
      if (error) {
        rechazar(error);
      } else {
        resolver(decodificado);
      }
    });
  });
}

244. luego de crear el controlador del login 
import bcryptjs from 'bcryptjs';
import { generarToken, verificarToken } from '../ayudas/funciones.js';
import ModelUsers from '../models/modelUsers.js';
const ControllerLogin ={
    inciarSesion: async (sol, res)=>{
        try{
            const{ username, password}= sol.body;
            const userFound = await ModelUsers.findOne({
                email: username,
            });
            const contraseniaValidada = await bcryptjs.compare(
                password,
                userFound.password
            );

            if( contraseniaValidada){
                const token = await generarToken({
                    id: userFound._id,
                    name: userFound.name,
                });
                res.json({
                    result: 'fine',
                    message:'Access ready',
                    data: token,
                });
            }else {
                res.json({
                    result: 'mistake',
                    message:'access restringer',
                    data: null,
                });
            }
        }catch(error){
            res.json({
                result: 'mistake',
                message:'An error occurred while login access',
                data: error,
            });
        }
    },
    validarToken : async (sol, res)=>{
        try{
            const token = sol.params.token;
            const decodificado = await verificarToken(token);

            if (decodificado.id){
                res.json({
                    result: 'fine',
                    message: 'token valid',
                    data: decodificado,
                });
            }else{
                res.json({
                    result: 'mistake',
                    message: 'token invalid',
                    data: null,
                });
            }
        }catch(error){
            res.json({
                result: 'mistake',
                message: 'ocurred mistake token invalid',
                data: null,
            });
        }
    },
};
export default ControllerLogin;

245. Creamos nuestra ruta igual que como hicimos en las rutas de usuario 
import {Router} from 'express';
import ControllerLogin from '../controllers/controllerLogin';
const routerLogin = Router();
routerLogin.post('/', ControllerLogin.inciarSesion);
routerLogin.get('/token', ControllerLogin.validarToken);
export default routerLogin;

# controllerUsers parte opcional para recuperar contraseña
* paso 6 creo una funcion para generar una nueva contraseña en caso de olvido, en esta funcion voy a llamar al esquema de usuario donde lo busque por correo
* Paso 7 luego que tenga los datos de este genero una contraseña aleatoria la cual se va a enviar por correo al correo registrado
* paso 8 ahora voy a la rutas para realizar el enrutamiento creando un archivo para enrutar los usuarios

25. hacemos cambios en nuestro controlador y nuestras rutas 
# routerUsers.js
* ingreso el siguiente codigo
routerUsers.post('/forgot-password', async(sol, res)=>{
    const{email} = sol.body;
});
# aqui termina la parte opcional para recuperar contraseña

26. Podria crear un MVC de productos para que cuando el usuario se loguee lo redirija un shop 

261. creando el modelo o shema de productos 
262. creando el controlador de productos 
263. y creando la ruta de los porductos 

# VER DOCUMENTO Subir una imagen a la base de datos desde postman


 ahora vamos al fron a crear los diferentes componentes
# abro una ventana nueva de power shell 

## FRONT

27. Instalar angular con el comando npm install -g @angular/cli 
# aqui vemos que no pasó nada ahora con el siguiente comando empezariamos un proyecto de angular nuevo
# vamos a la ruta donde esta ubicado nuestro proyecto 
28. ng new seguido por el nombre del proyecto en este caso front en la primera opcion selecciono CSS y luego YES
# consola ? Do you want to create a 'zoneless' application without zone.js (Developer Preview)? (y/N)
el cli de angular instala los paquetes del npm y otras dependencias 
luego nos dice  sobre el formato de css escogemos la primera opcion dando enter 
# Which stylesheet format would you like to use? (Use arrow keys)
> CSS             [ https://developer.mozilla.org/docs/Web/CSS                     ]
  Sass (SCSS)     [ https://sass-lang.com/documentation/syntax#scss                ]
  Sass (Indented) [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
  Less            [ http://lesscss.org                                             ]

#  Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? (y/N) 
damos y

# ya podemos cerrar el power shell e ir a nuestro proyecto 

29. navegar hasta la carpeta del espacio  de trabajo en front cd front 
30. Instalar dependencias:
# link https://getbootstrap.com/
 -npm i bootstrap@5.3.6
 -npm i bootstrap-icons
 -npm i cors : Cuando tu aplicación Angular (que generalmente se ejecuta en un dominio y puerto, por ejemplo, localhost:4200) intenta hacer una solicitud HTTP a una API (que podría estar en un dominio o puerto diferente, por ejemplo, api.mi-servidor.com:3000), el navegador bloquea automáticamente esa solicitud si el servidor no indica explícitamente que permite las solicitudes desde el origen de tu aplicación Angular. Aquí es donde entra CORS.
 -npm i ngx-toastr : Mostrar notificaciones tipo "toast" o "pop-up" en tu interfaz de usuario (UI) de Angular.


## CREACION DE COMPONENTES 

31. comando ng generate component para ser mas organizado con tu codigo es recomendable crear carpetas indicando si son componentes o interfaces o servicios o guards dependiendo de la necesidad de tu proyecto y luego nombre del componente
* abreviado ng g c nombre de la carpeta/nombre del componente --skip-tests ejemplo 
# voy a crear de una vez os componentes que podria necesitar si necsito mas lego los ire creando 

# ng g c components/home --skip-tests
# ng g c components/navigation --skip-tests
# ng g c components/login --skip-tests
# ng g c components/register --skip-tests
# ng g c components/page-not-found --skip-tests

## APP.HTML
* Este es el componente raiz de la aplicacion aqui podemos poner la informacion que queremos que se visualice en nuesta primera pagina 
* este componente tiene un diseño por defecto alli podemos borrar todo ese diseño previo y solo dejar <router-outlet /> como nos lo indica el archivo 
* como el primero que quiero poner es el nav voy a ir a navigation.ts y luego copio el nombre del  selector: 'app-navigation', luego voy a mi archivo app.html y pego la ruta de la siguiete forma <app-navigation/> luego realizo la prueba para ver si el app.html muestra los datos del navigation.html, en la consola pongo el comando ng serve -o  || ng s || ng s -o


# USO DE BOOSTRAP
# link info https://dev.to/venkateshpensalwar/add-css-framework-in-angular-5e2f
* para usar bootstrap en nuestra aplicacion podemos agregarlo a las dependencias instalandolo y realizando los siguientes cambios vamos ala pagina https://getbootstrap.com/ y en docs sacamos el npm i bootstrap@5.3.3
* para usar os iconos de bootstrap vamos al apartado iconos y tomamos el npm i bootstrap-icons
* instalamos ngx-toastr con npm i ngx-toastr se utiliza para mostrar notificaciones en pantalla en una aplicación Angular
* luego de instalar las dependencias vamos a nuestro archivo angular.json anexar:
"styles": [
              "node_modules/bootstrap/scss/bootstrap.scss",
              "node_modules/bootstrap-icons/font/bootstrap-icons.min.css",
              "node_modules/ngx-toastr/toastr.css",
              "src/styles.css"
            ],
"scripts": [
              "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
            ],

32. creando el nav con ayuda de bootstrap: selecciono el navegador que requiero y lo dejo en el navigation.html

33. como el navegador va a tener unos links para ingresar debo crear las rutas de esos links 

# app.routes.ts
34. importo los componentes que necesito 
35. trazo los caminos usando path para todos los links 

import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Register } from './components/register/register';

/**ahora las llamo con path que significa camino  */
export const routes: Routes = [

    {path: 'home', title: 'Home', component: Home},
    {path: 'login', title: 'Login', component: Login},
    {path: 'register', title: 'Register', component: Register},
    {path: '', redirectTo: 'home', pathMatch: 'full'},//aqui indicamos que por defecto envie al home apenas yo abra la pagina 
    {path: '**', title: '404 |Page Not Found', component: PageNotFound}, // aqui indicamos que si se ingresa algo en la direccion y esta mal escrito que nos envie al not found sin sacarnos de la pagina 

];
# primero realizo este cambio en el navigation.html ejemplo= routerLink="login">login</a>

# navbar.ts
36. import { RouterLink } from '@angular/router'; y lo activo en los imports para que reconozca las rutas previamente creadas en app.routes.ts


# home.html
37. agrego las cosas que quiero que se muestren de primeras en este caso pondre un carrusel con bostrap e imagenes de ejemplo 

# VERIFICO QUE CADA LINK ME ENVIE A DONDE DEBE IR  EJEMPLO REGISTER TRAE REGISTER WORKS

##### voy aqui ####

# Para protejer las rutas creamos creamos:
 -ng generate guard en mi caso lo llame auth-guard -ng generate guard guards/auth-guard
 esto crea dos carpetas automaticamente que son:
 auth-guard.guard.spect.ts
 auth-guard.guard.ts
 * Reiniciar componentep rincipal
 * Craer componente base (público, inicio de sesión y privado).
 * Craer enrutamiento base.
 * Craer estilos globales (framework, fuentes, colores).
 * Notificaciones al usuario,
 * Favicon personalizado.
 * En cada componente ( comprobar/ agregar/ editar/ actualizar)
 * Implementar servicios.
 * Actualizar información.



# LOGIN 
44. para el login debemos empezar por el html creando el formulario de logueo 

45. Luego voy a la lógica de mi componente en login.ts 
* Para recibir los datos de usuario y la contraseña voy a crear una interface esto lo hago con el comando ng g interface interfaces/credential  

# credential interfaces

46. en el archivo credentials.ts vamos a llamar a las credenciales para el logueo
 export interface Credential {
    username: string;
    password: string;
}
47. Luego lo importo en mi login.ts esta interface

48.	Ahora voy a dedicarme a capturar esos datos dentro de mi login.ts
Voy a crear un objeto llamado credentialsForm = que va a tener unas nuevas instancias del FormGroup es objeto se va a encargar de capturar la información que se ingresa en el formulario que esta en el login.componet.html

49.	De aqui necesito un username que va a tener un nuevo formulario de control lo primero que va a traer es un string vacio en donde se van a enviar los datos que se digiten en el formulario y estos datos se les va a realizar una validación requerida para eso usamos Validators. Required 

* Por ahora si probamos no está capturando ninguna información así que voy al login.html para ligar el login.ts con el login.html

50.	En el html voy a utilizar una directiva para el formulario 

<form [formGroup]="credentialsForm">
* En el input tengo que asociar el formcontrol con la propiedad del username con el atributo FormControlName realizo la asociación quedaría de esta forma 
<form [formGroup]="credentialsForm">
      <input type="text" placeholder="username" formControlName="username">
     <input type="password" placeholder="password" formControlName="password">
      <input type="submit" value="Login">
    </form>

51.	Ahora hace falta que el boton de submit almacene la información con un evento que debo poner en el formulario este evento es el (ngSubmit) dentro del cual voy a crear un método para manejar y enviar la informacion al cual voy a llamar handleSubmit() que significa manejarEnviar este me va a presentar error por que no existe en mi lógica o también llamado mi login.ts

<form [formGroup]="credentialsForm" (ngSubmit)="handleSubmit()">
      <input type="text" placeholder="username" formControlName="username">
      <input type="password" placeholder="password" formControlName="password">
      <input type="submit" value="Login">
    </form>

52.	Voy a crear el método en mi login.ts con un console.log que diga Works para hacer una prueba 

handleSubmit() {
    console.log("works");
};

53.	Y doy clic en el botón para verificar que este escuchando ese clic por el momento reviso la consola de mi navegador

14.	Ahora yo quiero saber si estas credenciales son validas para permitir el ingreso al usuario 
* Primero muestro por consola que está en credentialForms

handleSubmit() {
console.log(this.credentialsForm);
};

* Ahora se realiza la prueba con datos y ahora vemos que recibe los datos y el validator esta en true 

55.	Listo ya que sabemos que recibimos datos entonces vamos a armar un objeto para que cumpla con la estructura, asi que voy a crear una condicional que tenga dos const username donde almaceno lo que viene de this.credentialsForm y recibo el valor .value de username que es viene de  la interface credentials y lo mismo con el password

* Como ya no me recibe nada por la condicional de los datos del credential voy a crear una constante que le voy a llamar credential y con los dos puntos le digo que tipo de dato es string,number, etc en este caso el dato va a ser de tipo Credential para que el sepa que su tipo va a ser de la interface en donde están almacenados los objetos que son  mi user y mi password que ya están identificados previamente como tipo string, a esto le voy a asignar unos valores una propiedad que se llame username y password quedaría de la siguiente forma 

handleSubmit() {
  // console.log("works");
  //console.log(this.credentialsForm);
    if (this.credentialsForm.valid) {
     const username = this.credentialsForm.value.username;
     const password = this.credentialsForm.value.password;

     const credential: Credential = {
          username,
          password,
  };
} else {
  	console.log('Error invalid form');
       }
   }


* Como esto me genera error que dice que el tipo string nulo o indefinido no es asignable a un tipo string entonces lo que pasa aquíi es que yo le estoy diciendo que este objeto debe tener una estructura si o si es un string el erro me dice que debo asegurarme que hay un string entonces de que manera me aseguro yo de eso 
* Vamos a crear una condición para asegurar que el valor es de tipo string en donde diga si el tipo de dato que estoy usando es un string pero esto lo debo hacer tanto para username como para el password

if (typeof username === 'string' && typeof password === 'string') {
    const credential: Credential = {
          username,
          password,
  };
}

* Y creo un console log al objeto credential

if (typeof username === 'string' && typeof password === 'string') {
    const credential: Credential = {
          username,
          password,
  };
  console.log(credential);
}

* para ver como se comporta si envio vacio me va a mostrar un error que es invalido mi formulario 
* Si envio datos y los envio podre ver nuevamente los datos pero dentro de credential 

56.	En este punto ya tengo los datos capturados pero que puedo hacer con estos datos 
* Esperar respuestas 
* Hacer la prueba donde ingreso datos por el postman y no se logue la persona asi los datos esten correctos por que aun faltan pasos para que se pueda validar esta información del back 

57. vamos al back a crear todo lo del inicio de sesion 

58.  creo un servicio para el login  con el comnado ng g s services/login

59. ahora vamos al back a crear una carpeta llamada ayudas y dentro un archivo llamado funciones donde voy a revizar todo el tema del los token 

60. luego la ruta del incio de sesion en el back 

61. esta parte esya pendiente por validar si es necesaria 

# register.html 
38. agrego el fomrulario para el registro 


39. creo un servicio para el registro con el comando ng g s services/register el cual me va a generar una nueva carpeta de servicios en donde voy a indicar a que ruta del back se va a conectar para registrar el usuario   (createUser en mi controlador del back)

# register.service.ts
40. aqui importo los inyectables y HttpClient es un servicio incorporado en Angular que facilita la comunicación con servidores remotos a través del protocolo HTTP.

import { HttpClient } from '@angular/common/http';
import { Injectable , inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Register {

  constructor() { }
  /**aqui despues del constructor es donde digo en donde se va a conectar  */
  httpClient = inject(HttpClient);// Inyecta el servicio HttpClient para realizar peticiones HTTP.
  API_URL = 'http://localhost:3000/users'//esta es la ruta que viene de postman

   // creo un metodo para la creacion del usuario desde el front
  createUser(name:string,email:string,password:string,)
  {
    //creo una constante para traer los datos del esquema 
    const user={
      name,
      email,
      password
    };
    // retorno la respuesta de el envio de informacion con el metodo post al api 
    return this.httpClient.post(this.API_URL,user,{
      headers:{
        'Content-Type': 'application/json'
      }
    });
  }
}

# register.ts
42. en este componente de ts vamos a importar el servicio el formsnodule para manejar los formularios toastrService para el manejo de mensajes y router para las rutas ver register.ts

import { RegisterService } from './../../services/register-service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  // creamos un constructor privado para redirigir al usuario al login despues de reistrarse 
  constructor(private router: Router){}
  redirectToOtherPage(){
    this.router.navigate(['/login'])
  }

  // activo los demas inyectandolos 
  toastrService = inject(ToastrService);
  registerService = inject(RegisterService);

  // luego llamo a los atributos del formulario que se enlazan para tener acceso a las propiedades 

  name: string = "";
  email: string = "";
  password: string = "";

  // ahora creo un metodo para manejar y enviar la informacion 

  handleSubmit(){
    if(this.name){
      this.registerService.createUser(
        this.name,
        this.email,
        this.password
      ).subscribe((response:any)=>{
        console.log("response:", response);
      })
    }
    this.redirectToOtherPage();
  }
}

## revisar este punto ya que estoy presnetando errores  basarme en el login primero 

# register.html 
43. aqui llamo al form con el metodo creado en register.ts handleSubmit para manejar y enviar la informacion 






