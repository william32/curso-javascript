// Valida si existe en local Storage si existe el item "Tema" y lo carga en como atributo en el bosy (bootstrap) sino carga uno por defecto
let getTema = localStorage.getItem("tema")
if (getTema) {
    document.body.setAttribute('data-bs-theme', getTema)
} else {
    document.body.setAttribute('data-bs-theme', "light")
}

// Escucha el evento click y setea en local storage la variable
temaSeleccinado = document.querySelector("#seleccionTema")
temaSeleccinado.addEventListener("click", (event) => {
        document.body.setAttribute('data-bs-theme', event.target.dataset.value)
        localStorage.setItem("tema", event.target.dataset.value)
    }
)
const addShop = JSON.parse(localStorage.getItem("carro")) || []
geCountElementInCarro()

// Maneja en contador de item que estan en el carro
function geCountElementInCarro() {
    let counterShop = document.querySelector('#counterShop')
    let value = JSON.parse(localStorage.getItem("carro"))
    counterShop.innerHTML = value?.length || 0
}

const getDataCarro = JSON.parse(localStorage.getItem("carro")) || []
console.log(getDataCarro.length);
const dataCarro = document.querySelector("#rowData")
if(getDataCarro.length > 0){
    let valorTotal = calculateTotal(getDataCarro)
    for (let index = 0; index < getDataCarro.length; index++) {
        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card mb-12')
        divCard.innerHTML += `
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${getDataCarro[index]["img"]}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body"> 
                <h5 class="card-title">${getDataCarro[index]["nombre"]}</h5>
                <p class="card-text">${getDataCarro[index]["descripcion"]}</p>
                <p class="card-text"><small class="text-body-secondary">Precio: ${getDataCarro[index]["precio"]}</small></p>
            </div>
            </div>
        </div>
        `
        let buttonProducto = document.createElement('button')
            buttonProducto.innerHTML = 'Eliminar del Carro!';
            buttonProducto.addEventListener('click', () => {
                console.log(getDataCarro[index]['id']);
                // deleteElementToLocalSotrage(data[index])
            })

        divCard.appendChild(buttonProducto)
        dataCarro.appendChild(divCard)
        
    }
    const divTotal = document.createElement('div')
    divTotal.setAttribute('class', 'total')
    divTotal.innerText = "Precio total: "+valorTotal 
    dataCarro.appendChild(divTotal)
}else {
    console.log("vacio")
    const divCard = document.createElement('div')
    divCard.setAttribute('class', 'card-body cart')
    divCard.innerHTML += `
    <div class="col-sm-12 empty-cart-cls text-center">
        <img src="./imagenes/empty-shop.png" width="130" height="130" class="img-fluid mb-4 mr-3" style="width: 100px">
        <h3><strong>Carrito Vacio</strong></h3>
        <h4>Agrega algo que me haga feliz :)</h4>
        <a href="./index.html" class="btn btn-primary cart-btn-transform m-3" data-abc="true">Volver a los productos</a>
    </div>
    `
    dataCarro.appendChild(divCard)
}

function calculateTotal(array) {
    var total = 0;
    array.forEach(item => {
        total += item.precio;
    });
    return total.toFixed(2)
  }


								


