import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductosS } from '../../../services/productos-s';
import { Productos } from '../../../interfaces/productos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-crud-productos',
  imports: [CommonModule,FormsModule],
  templateUrl: './crud-productos.html',
  styleUrls: ['./crud-productos.css']
})
export class CrudProductos implements OnInit{

  productos: Productos[]=[];
  imagenBaseUrl = 'http://localhost:3000/imagenes/';
  mostrarFormulario = false;
  productoForm: Productos= this.resetProducto();

  modo: 'crear' | 'editar' = 'crear';

  constructor(private productosService:ProductosS,
              private cdr: ChangeDetectorRef
  ){}


  // metodo para cargar los productos en la tablas 
  obtenerProductos():void{
    this.productosService.getAll().subscribe({
      next:(resp)=>{
        this.productos= resp;
        this.cdr.detectChanges();
      },
      error:(err)=> console.error("Error al cargar los productos", err)
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  // metodo previo para que podamos cargar nuestro metodo de crear producto 

  selectedFile!: File;

  onFileSelected(event: any):void{
    const file: File = event.target.files[0];
    if(file){
      this.selectedFile = file;
    }
  }

  // metodo para crea un producto

  crearProducto():void{
    if(!this.selectedFile){
      alert("Por favor selecciona una imagen");
      return;
    }

    const formData = new FormData();
    formData.append('modelo', this.productoForm.modelo);
    formData.append('material', this.productoForm.material);
    formData.append('precio', this.productoForm.precio.toString());
    formData.append('color',this.productoForm.color);
    formData.append('imagen', this.selectedFile);

    this.productosService.crear(formData).subscribe({
      next:()=>{
        alert('Producto creado correctamente');
        this.productoForm = this.resetProducto();
        this.selectedFile = undefined!;
        this.mostrarFormulario = false;
        this.obtenerProductos();
        this.cdr.detectChanges();
      },
      error:(err)=> {
        console.error("Error al cargar los productos", err);
        alert('Error al cargar los productos');
      } 
    });
  }


  // metodo previo al metodo para actualizar 

  resetProducto():Productos{
    return{
      modelo:'',
      material:'',
      precio: 0,
      color: '',
      imagen:''
    };
  }

  seleccionarParaEditar(producto: Productos):void{
    this.modo = 'editar';
    this.productoForm ={ ...producto};
    this.mostrarFormulario = true;
  }

  prepararCrear():void{
    this.modo='crear';
    this.productoForm = this.resetProducto();
    this.mostrarFormulario=true;
  }

  cancelarFormulario():void{
    this.mostrarFormulario = false;
  }

  // metodo para actualizar 
  actualizarProducto():void{
    if(!this.productoForm._id){
      alert('No se ncontro el ID del producto');
      return;
    }
    //preparacion de los datos que espero recibir 
    const formData = new FormData();
    formData.append('modelo', this.productoForm.modelo);
    formData.append('material', this.productoForm.material);
    formData.append('precio', this.productoForm.precio.toString());
    formData.append('color',this.productoForm.color);

    // solo agregamos nueva imagen si selecciona una 
    if(this.selectedFile){
      formData.append('imagen', this.selectedFile);
    }

    this.productosService.actualizar(this.productoForm._id,formData).subscribe({
      next:()=>{
        alert("Producto actualizado correctamente");
        this.obtenerProductos();
        this.productoForm = this.resetProducto();
        this.selectedFile = undefined!;
        this.mostrarFormulario = false;
        this.obtenerProductos();
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.error("Error al actualizar el producto",err);
        alert("Error al actualizar el producto")
      }
    });
  }

  // metodo para eliminar producto
  eliminarProducto(id : string):void{
    if(confirm("Estas seguro de eliminar el producto?")){
      this.productosService.delete(id).subscribe({
        next:(resp)=>{
          alert("Prodcuto eliminado exitosamente");
          this.productos = resp;
          this.obtenerProductos();
          this.cdr.detectChanges();
        },
          error: (err)=> console.error("Error al eliminar", err)
      });
    }
  }
}
