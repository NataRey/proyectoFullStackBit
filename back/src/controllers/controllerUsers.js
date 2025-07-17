import bcrypt from 'bcryptjs';// para encriptar la contrasena
import modelUsers from "../models/modelUsers.js"// para poder controlar el schema de usuarios
import crypto from 'crypto';
import nodemailer from 'nodemailer';


const ControllerUsers = {
    createUser: async(sol , res)=>{
        try{
            const {name, email, password, rol} = sol.body;
            console.log(sol.body);
            const passwordProtected = await bcrypt.hash(password, 10);
            const newUser = new modelUsers({
                name,
                email,
                password: passwordProtected,
                rol:rol || 'user'

            });
            console.log(newUser);

            const userCreate = await newUser.save();
            if(userCreate._id){
                res.json({
                    result: 'fine',
                    message: 'User created',
                    data: userCreate._id,
                });
            }
        }catch(error){
            res.json({
                result: 'mistake',
                message: 'An error occurred while creating the user',
                data: error,
            });
        }
    },
    readUser: async(sol , res)=>{
        try{

            const userFound = await modelUsers.findById(
                sol.params.id
            );
            if(userFound._id){
                res.json({
                    result: 'fine',
                    message: 'User found',
                    data: userFound,
                });
            }

        }catch(error){
            res.json({
                result: 'mistake',
                message: 'An error occurred while reading the user',
                data: error,
            });
        }
    },
    readUsers: async(sol , res)=>{
        try{
            const allUserFound = await modelUsers.find();
            res.json({
                result: 'fine',
                message: 'User found',
                data: allUserFound,
            })

        }catch(error){
            res.json({
                result: 'mistake',
                message: 'An error occurred while reading all users',
                data: error,
            });
        }
    },
    updateUser: async (sol , res)=>{
        try{
            const userUpdate = await modelUsers.findByIdAndUpdate(
                sol.params.id,
                sol.body
            );
            if(userUpdate._id){
                res.json({
                    result: 'fine',
                    message: 'User updated',
                    data: userUpdate._id,
                });
            }
        }catch(error){
            res.json({
                result: 'mistake',
                message: 'An error occurred while updating user',
                data: error,
            });
        }
    },
    deleteUser: async (sol , res)=>{
        try{
            const userDelete = await modelUsers.findByIdAndDelete(
                sol.params.id
            );
            if(userDelete._id){
                res.json({
                    result: 'fine',
                    message:'User deleted',
                    data: null,
                });
            }

        }catch(error){
            res.json({
                result: 'mistake',
                message: 'An error occurred while deleting user',
                data: error,
            });
        }
    }
};

// funcion para crear una contrasena aleatoria
function generarContrasenaAleatoria(){
    return crypto.randomBytes(6).toString('hex');
}

export const forgotPasword = async (sol , res)=>{
    try{
        const { email }= sol.body
        const user = await modelUsers.findOne({email});
        if(!user){
            return res.status(404).json({message:'No se encontro el correo registrado en la base de datos'});
        }
        const nuevaPassword = generarContrasenaAleatoria();
        const hashedPassword = await bcrypt.hash(nuevaPassword , 10);

        user.password = hashedPassword;
        await user.save();

        // configuracion del servicio de correo 
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_NODE,
                pass: process.env.PASS_NODE
            },
        });

        // contenido del correo
        const mailOptions = {
            from: 'desarrollobitpruebas@gmail.com',
            to: email,
            subject: 'Recuperaciond e contraseña',
            text: `Hola ${user.name}, \n\Tu nueva contraseña es: ${nuevaPassword}\n\ Recuerda actualizar tu contraseña en tu perfil por seguridad. \n\ Saludos desde el area de soporte.`
        };

        // envio de correo

        await transporter.sendMail(mailOptions);

        // Responder al usuario

        res.status(200).json({message: 'Se ha enviado una nueva contraseña al correo registrado.'});

    }catch(error){
        console.error('Error al recuperar la contraseña', error);
        res.status(500).json({message: ' Error interno en el servidor', error: error.message});
    }
}



export default ControllerUsers;




