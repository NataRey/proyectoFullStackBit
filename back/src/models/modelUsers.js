import { match } from 'assert';
import { Schema, model} from 'mongoose';
import { type } from 'os';

const schemaUser = new Schema({
    name: {type: String, required: true, trim: true},
    email: {
        type: String, 
        required: true,
        match:[/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "email ivalid"]
    },
    password: {
        type: String, 
        required: true,
        trim: true, // elimina los espacios en blanco del inicio y final
        match:[/^(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])\S+$/,"password invalid"]
    },
    role:{
        type: String, 
        enum:["user", "admin"],
        default:"user",
        required: false
    } 
});

export default model ('User', schemaUser);


