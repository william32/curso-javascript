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


    

const resultado = {};
let newArr = [];
let getDataCarro = JSON.parse(localStorage.getItem("carro")) || []
const dataCarro = document.querySelector("#rowData")
if (getDataCarro.length > 0) {
    let valorTotal = calculateTotal(getDataCarro)
    generateHtml(getDataCarro)
    generateButtonsPayCancel(valorTotal)
} else {
    const divCard = document.createElement('div')
    divCard.setAttribute('class', 'card-body cart')
    divCard.innerHTML += `
    <div class="col-sm-12 empty-cart-cls text-center">
        <img src="./imagenes/empty-shop.png" width="130" height="130" class="img-fluid mb-4 mr-3" style="width: 100px">
        <h3><strong>Carrito Vacio</strong></h3>
        <h4>Agrega algo para me haga feliz :)</h4>
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

function deleteElementToLocalSotrage(arr, deleteItem) {
    newArr = []
    arr.forEach(element =>{
        if(element.id != deleteItem)
        {
            console.log(element.id)    
            newArr.push(element)
        }
    })
    saveToLocalStorage(newArr)
}

// Guarda en localStorage en item carro
function saveToLocalStorage(data) {
    localStorage.setItem("carro", JSON.stringify(data))
    geCountElementInCarro()
    location.reload();
}

const btnPagar = document.querySelector("#btn-pagar")
if (getDataCarro.length > 0) {
    btnPagar.addEventListener('click', (event) => {
        document.getElementById("formPay").style.display = 'block'
    })
}

const envioPago = document.querySelector("#envioPago")
envioPago.addEventListener('click', (event) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Gracias por tu compra",
        showConfirmButton: true
    });
    limpiaCarrito();
})

const btnVaciarCarro = document.querySelector("#btn-vaciar")
if (getDataCarro.length > 0) {
    btnVaciarCarro.addEventListener('click', (event) => {
        Swal.fire({
            title: "Estas Seguro de vaciar el Carrito?",
            text: "Esta accion no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vaciar &#128542;"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Carro Vacio &#128557;",
                    text: "Vuelve Pronto.",
                    icon: "info",
                    showConfirmButton: true
                });
                limpiaCarrito();
            }
        });
    })
}


function limpiaCarrito() {
    setTimeout(() => {
        localStorage.removeItem("carro")
        location.reload();
    }, 3000)

}

function generateHtml(array) {
    const resultado = {};
    let newArr = [];
    array.forEach(el => (
        resultado[el.id] = resultado[el.id] + 1 || 1
        )
    )
    for (let clave in resultado){
        newArr= array.find(x => x.id == clave)
        newArr.cantidad = resultado[clave]
        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card mb-12')
        divCard.innerHTML += `
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${newArr.img}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body"> 
                <h5 class="card-title">${newArr.nombre}</h5>
                <p class="card-text">${newArr.descripcion}</p>
                <p class="card-text">Cantidad: ${newArr.cantidad}</p>
                <p class="card-text price">Precio: ${newArr.precio}</p>

            </div>
            </div>
        </div>
        `
        const divContainerButton = document.createElement('div')
        divContainerButton.setAttribute("class", "containerButton")

        let buttonProducto = document.createElement('button')
        buttonProducto.setAttribute('id', newArr.id)
        buttonProducto.innerHTML = 'Eliminar del Carro! ';
        buttonProducto.addEventListener('click', (event) => {
            deleteElementToLocalSotrage(array, event.target.id)
        })
        divContainerButton.appendChild(buttonProducto)
        divCard.appendChild(divContainerButton)
        dataCarro.appendChild(divCard)
        
    }
}

function generateButtonsPayCancel(valorTotal){
    const divTotal = document.createElement('div')
    divTotal.setAttribute('class', 'total')
    divTotal.innerText = "Precio total: " + valorTotal
    dataCarro.appendChild(divTotal)

    const divPayContainer = document.createElement('div')
    divPayContainer.setAttribute('class', 'payContainer')
    dataCarro.appendChild(divPayContainer)

    const divPagar = document.createElement('button')
    divPagar.setAttribute('class', 'btn btn-success')
    divPagar.setAttribute('id', 'btn-pagar')
    divPagar.setAttribute('type', 'button')
    divPagar.innerText = "Pagar"
    divPayContainer.appendChild(divPagar)

    const divVaciar = document.createElement('button')
    divVaciar.setAttribute('class', 'btn btn-danger')
    divVaciar.setAttribute('id', 'btn-vaciar')
    divVaciar.setAttribute('type', 'button')
    divVaciar.innerText = "Vaciar Carro"
    divPayContainer.appendChild(divVaciar)
}
