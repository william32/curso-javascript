var bitacora = []
let mensaje = '';
class Producto {
    constructor(producto, stock,id) {
        this.producto = producto;
        this.stock = stock;
        this.id = id;
    }
}

function agregaProducto() {
    const nombreProducto = prompt("Ingrese el nombre de nuevo producto");
    const stock = parseInt(prompt("Ingrese stock inicial"));
    const operacion = new Producto(nombreProducto , stock, bitacora.length + 1)
    bitacora.push(operacion)
}

function sumaStock() {
    mensaje = '';
    const nombreProducto = prompt("Ingrese el nombre del producto");
    const cantidadProducto = parseInt(prompt("Ingrese la canitdad de productos a sumar"))
    const filtradoSuma = bitacora.filter((elemento)=>{
        return elemento.producto == nombreProducto
    })
    filtradoSuma.forEach((producto)=>{
        producto.stock = producto.stock + cantidadProducto
        const operacionSum = new Producto(producto.producto , producto.stock , producto.id)
        bitacora.push(operacionSum)
        mensaje = "El Producto: " + producto.producto+ "\n Tiene un nuevo stock de " + producto.stock + '\n'
    })
    alert(mensaje);
}

function restaStock() {
    mensaje = '';
    const nombreProducto = prompt("Ingrese el nombre del producto");
    const cantidadProducto = parseInt(prompt("Ingrese la canitdad de productos a restar"))
    const filtradoSuma = bitacora.filter((elemento)=>{
        return elemento.producto == nombreProducto
    })
    filtradoSuma.forEach((producto)=>{
        producto.stock = producto.stock - cantidadProducto
        if(producto.stock > 0) {
            const operacionSum = new Producto(producto.producto , producto.stock , producto.id)
            bitacora.push(operacionSum)
            mensaje = "El Producto: " + producto.producto+ "\n Tiene un nuevo stock de " + producto.stock + '\n'
        } else {
            mensaje = "Error al inagresar el nuevo stock del producto " + producto.producto + '\n'
        }
    })
    alert(mensaje);
}

function verProducto() {
    mensaje = '';
    const productoNombre = prompt("Ingrese el nombre del producto")
    const filtrado = bitacora.filter((elemento)=>{
        return elemento.producto == productoNombre
    })
    filtrado.forEach((producto)=>{
        mensaje = "El Producto: " + producto.producto+ "\n Tiene un stock de " + producto.stock + '\n'
    })
    alert(mensaje);
}

function listaProducto(){
    mensaje = '';
    if(bitacora.length > 0) {
        bitacora.forEach((elemento)=>{
            mensaje += "El Producto: " + elemento.producto+ " Tiene un stock de " + elemento.stock + '\n'
        })      
    } else {
        mensaje += "No existen productos"
    }
    alert(mensaje);
} 

let opcion = parseInt(prompt("Elija una opción: \n 1-Nuevo Producto \n 2-Sumar Stock \n 3- Restar Stock  \n 4-Ver Producto \n 5-Lista  \n 6-Salir"));

while (opcion !== 6) {
    switch (opcion) {
        case 1:
            agregaProducto()
            break;
        case 2:
            sumaStock()
            break;
        case 3:
            restaStock()
            break;
        case 4:
            verProducto()
            break;
        case 5:
            listaProducto()
            break;
        default:
            alert("Opcion invalida")
            break;
    }
    opcion = parseInt(prompt("Elija una opción: \n 1-Nuevo Producto \n 2-Sumar Stock \n 3- Restar Stock  \n 4-Ver Producto \n 5-Lista  \n 6-Salir"));
}
alert("Adios")