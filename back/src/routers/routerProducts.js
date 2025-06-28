import {Router} from 'express';
import controllerProducts from '../controllers/controllerProducts.js';


const routerProducts = Router();
routerProducts.post('/', controllerProducts.createProduct);
routerProducts.get('/:id', controllerProducts.readProduct);
routerProducts.get('/', controllerProducts.readProducts);
routerProducts.put('/:id', controllerProducts.updateProduct);
routerProducts.delete('/:id', controllerProducts.deleteProduct);


export default routerProducts;