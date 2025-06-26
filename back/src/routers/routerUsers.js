import {Router} from 'express';
import ControllerUsers from '../controllers/controllerUsers.js';

const routerUsers = Router();

routerUsers.post('/',ControllerUsers.createUser);
routerUsers.get('/:id', ControllerUsers.readUser);
routerUsers.get('/',ControllerUsers.readUsers);
routerUsers.put('/:id',ControllerUsers.updateUser);
routerUsers.delete('/:id', ControllerUsers.deleteUser);


export default routerUsers;

