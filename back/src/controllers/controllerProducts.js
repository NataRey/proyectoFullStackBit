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
                data: error,
            });
        }
    },

readProduct : async (sol , res)=>{
    try{
        const productFound = await modelProducts.findById(sol.params.id);
        if(productFound._id){
            res.json({
                result:'fine',
                message: 'Product read',
                data: productFound,
            });
        }

    }catch(error){
        res.json({
            result: 'mistake',
            message: 'An error occurred reading the product',
            data: error,
        });
    }
},

readProducts : async(sol , res)=>{
    try{
        const allProductsFound = await modelProducts.find();
        res.json({
            result: 'fine',
            message: ' Products found',
            data: allProductsFound
        });
    }catch(error){
        res.json({
            result: ' mistake',
            message: 'An error occurred reading all products',
            data: error,
        });
    }   
},
updateProduct : async(sol , res)=>{
    try {
        const productUpdate = await modelProducts.findByIdAndUpdate(sol.params.id,
            sol.body
        );
        if(productUpdate._id){
            res.json({
                result:'fine',
                message:'product update',
                data: productUpdate._id,
            });
        }

    }catch(error){
        res.json({
            result: ' mistake',
            message: 'An error occurred updating all products',
            data: error,
        });
    }
},

deleteProduct : async (sol , res)=>{
    try{
        const productDelete = await modelProducts.findByIdAndDelete(sol.params.id);
        if(productDelete){
            res.json({
                result:'fine',
                message:'product delete',
                data: null,
            });
        }
    }catch(error){
        res.json({
            result: ' mistake',
            message: 'An error occurred deleting all products',
            data: error,
        });
    }
}
}
export default controllerProducts;