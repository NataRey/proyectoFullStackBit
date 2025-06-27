import multer from 'multer';// maneja la subida de archivos
import modelProducts from '../models/modelProducts.js';

const controllerProducts = {
    createProduct: async (sol , res)=>{
        try{
            const almacenar = multer.diskStorage({
                destination: 'imagenes',
                filename:(req , file, cb)=>{
                    cb(null, file.originalname);
                },
            });
            const carga = multer({ storage:almacenar}).single('imagen');
            carga(sol , res , async(error)=>{
                if(error){
                    res.json({
                        result: 'mistake',
                        message: 'An error occurred while uploading the image',
                        data: null,
                    });

                }else {
                    const newProducts = new modelProducts({
                        modelo: sol.body.modelo,
                        material: sol.body.material,
                        precio: sol.body.precio,
                        color: sol.body.color,
                        imagen: sol.file.filename
                    });
                    const productsCreate = await newProducts.save();
                    if(productsCreate._id){
                        res.json({
                            result: 'fine',
                            message: 'Product create',
                            data: productsCreate._id,
                        });
                    }
                }
            });
        }catch(error){
            res.json({
                result: 'mistake',
                message: 'An error occurred creating the product',
                data: null,
            });
        }
    },



}
export default controllerProducts;