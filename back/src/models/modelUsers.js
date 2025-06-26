import { Schema, model} from 'mongoose';

const schemaUser = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    
});

export default model ('User', schemaUser);


