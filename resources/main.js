// Se declara stock de un producto
const cantidadProducto = 20;
// se define variable que acumulara el numero total de pedidos
let acumulador = 0;
// Inicio de bucle
do {
    // Se solicita ingreso de cantidad de productos solicitados 
    let ventaSolicitada = parseInt(prompt("Ingrese la cantidad de productos solicitados"));
    // Se escucha el reotorno de llamado de la funcion "entregaSotck"
    estatus = entregaSotck(ventaSolicitada);
} while(estatus)

// Funcion que recibe como parametro el valor ingresado por pantalla , lo suma al acumulador y valoda si se encuentra deto del stock. 
function entregaSotck(venta){
    acumulador += venta;
    console.log(acumulador);
    let stockDisponible = true;
    let stock = cantidadProducto - acumulador;
    if ( stock > 0){
        console.log("Quedan "+stock+" disponibles");
    } else {
        stockDisponible = false;
        console.log("Lo siento, no queda Stock del producto seleccionado");
    }
    return stockDisponible;
}