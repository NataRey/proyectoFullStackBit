export interface Productos {
    _id?: string;
    modelo:string;
    material: string;
    precio: number;
    color:string;
    imagen: string;
}

export interface ApiProductos{
    result: string;
    message: string;
    data:Productos[];
}
