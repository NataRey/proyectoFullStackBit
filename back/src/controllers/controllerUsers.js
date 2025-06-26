import bcrypt from 'bcryptjs';// para encriptar la contrasena
import modelUsers from "../models/modelUsers.js"// para poder controlar el schema de usuarios

const controllerUsers = {
    createUser: async(sol , res)=>{
        try{
            const {name, email, password} = sol.body;
            console.log(sol.body);
            const passwordProtected = await bcrypt.hash(password, 10);
            const newUser = new modelUsers({
                name,
                email,
                password: passwordProtected,
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
}



