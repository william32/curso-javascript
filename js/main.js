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

// Trae el contenido del Json y lo imprime en el html
const contenedor = document.querySelector("#productosGrid")
fetch('./json/productos.json')
    .then(response => response.json())
    .then(data => {
        for (let index = 0; index < data.length; index++) {
            const divProducto = document.createElement('div')
            divProducto.setAttribute('class', 'col-sm-3 mb-3 products')
            divProducto.innerHTML += `
                    <div id="${data[index].id}" class="card">
                        <img src="${data[index].img}" class="card-img-top" alt="${data[index].nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${data[index].nombre}</h5>
                            <p class="card-text valor">Valor: ${data[index].precio}</p>
                        </div>
                    </div>
            `
            let buttonProducto = document.createElement('button')
            buttonProducto.innerHTML = 'Agregar al Carro!';
            buttonProducto.addEventListener('click', () => {
                addShop.push(data[index])
                saveToLocalStorage(addShop)
            })
            divProducto.appendChild(buttonProducto)
            contenedor.appendChild(divProducto)
        }
    })
    .catch(error => console.error('Error fetching JSON:', error));

//Buscador
const inputSearch = document.querySelector(".form-control")
inputSearch.addEventListener("input", (event) => {
    let cards = document.getElementsByClassName("products");
    for (i = 0; i < cards.length; i++) {
        current = cards[i];
        titleCard = current.getElementsByClassName('card-title')[0];
        text = titleCard.innerText.toUpperCase();
        if (text.indexOf(event.target.value.toUpperCase()) !== -1) {
            current.style.display = "";
        } else {
            current.style.display = "none";
        }
    }
})

// Guarda en localStorage en item carro
function saveToLocalStorage(data) {
    localStorage.setItem("carro", JSON.stringify(data))
    geCountElementInCarro()
}

// Maneja en contador de item que estan en el carro
function geCountElementInCarro() {
    let counterShop = document.querySelector('#counterShop')
    let value = JSON.parse(localStorage.getItem("carro"))
    counterShop.innerHTML = value?.length || 0
}