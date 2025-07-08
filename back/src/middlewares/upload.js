import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: 'imagenes',
    filename:
    (req , file, cb)=>{
                   // cb(null, file.originalname);
        const extension = path.extname(file.originalname);

        const nameWithoutExt = path.basename(file.originalname, extension).replace(/\s+/g,'-').toLowerCase();//Mi  Pagina Web= mi-pagina-web.jpg
        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g,'');

        //07-07-2025.6:34:56:00.T = 070720256345600
        //mi-pagina-web070720256345600.jpg
        //mi-pagina-web070720256364015.jpg

        const uniqueName =`${nameWithoutExt}${timestamp}${extension}`;
        cb(null, uniqueName);
    },
});

export const uploadSingleImage = multer({storage}).single('imagen');