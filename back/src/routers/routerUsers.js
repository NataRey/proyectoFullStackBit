import {Router} from 'express';
import ControllerUsers, { forgotPasword } from '../controllers/controllerUsers.js';

const routerUsers = Router();

routerUsers.post('/',ControllerUsers.createUser);
routerUsers.get('/:id', ControllerUsers.readUser);
routerUsers.get('/',ControllerUsers.readUsers);
routerUsers.put('/:id',ControllerUsers.updateUser);
routerUsers.delete('/:id', ControllerUsers.deleteUser);
routerUsers.post('/forgot-password', forgotPasword);


export default routerUsers;

