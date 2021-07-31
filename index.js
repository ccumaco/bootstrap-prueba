let dataApi = []
let containerCards = document.getElementById('container-cards')
let containerList = document.getElementById('container-list')
function loadCountriesApi() {
    containerCards.innerHTML = ` `
    containerCards.innerHTML += `
    <div class="card not-fit" style="width: 18rem;" onClick="randomOrdenate()">
        <button class="random">Organizar Aleatoriamente</button>
    </div>
    `
    
    dataApi.forEach(function (element, indice) {
        containerList.innerHTML += `
                <li><a class="dropdown-item" onClick="filterCountry(${indice})">${element.name}</a></li>
                <li>
                <hr class="dropdown-divider">
                </li>
            `
        containerCards.innerHTML += `
            <div class="card" style="width: 18rem;" onClick="filterCountry(${indice})">
            <div class="container-image">
            <img  src="${element.flag}" class="card-img-top" alt="${element.name}">
            </div>
            <div class="card-body">
            <h5 class="card-title">País: ${element.name}</h5>
            <div id="container-currencies">
            <ul>
                <li class="name-currenci"><b>Moneda:</b> ${element.currencies[0].name}</li>
                <li class="symbol-currenci"><b>Signo:</b> ${element.currencies[0].symbol}</li>
                <li class="code-currency"><b>Código:</b> ${element.currencies[0].code}</li>
            </ul>
            </div>
            <a href="#" class="whatch-more">
                <button>
                    Ver mas información
                </button>
            </a>
            </div>
            </div>
            `
    });

}
$(document).ready(function () {
    if ("loading" in HTMLImageElement.prototype) {
        console.log("Browser support `loading`...");
    } else {
        console.log("Not supported");
    }


    var screen = $('#body-loader');
    configureLoadingScreen(screen)


    let urlApi = 'https://restcountries.eu/rest/v2/all'
    let loader = true
    jQuery.ajax({
        async: false,
        url: urlApi,
        type: 'GET'
    }).done(
        function (resp) {
            dataApi = resp
            loader = false
        }
    )


    function configureLoadingScreen(screen) {
        $(document)
            .ajaxStart(function () {
                screen.fadeIn();
            })
            .ajaxStop(function () {
                screen.fadeOut();
            })
    }

    loadCountriesApi()
})

function filterCountry(params) {
    containerCards.innerHTML = `
    <button class="come-back" onClick="loadCountriesApi()">Volver</button>
            <div class="card" style="width: 50%;" onClick="filterCountry(${params})">
            <div class="container-image max-image">
            <img  src="${dataApi[params].flag}" class="card-img-top" alt="${dataApi[params].name}">
            </div>
            <div class="card-body center">
            <h5 class="card-title">País: ${dataApi[params].name}</h5>
            <div id="container-currencies">
            <ul>
                <li class="name-currenci"><b>Moneda:</b> ${dataApi[params].currencies[0].name}</li>
                <li class="symbol-currenci"><b>Signo:</b> ${dataApi[params].currencies[0].symbol}</li>
                <li class="code-currency"><b>Código:</b> ${dataApi[params].currencies[0].code}</li>
            </ul>
            </div>
            <a href="#" class="whatch-more">
                <button>
                    Ver mas información
                </button>
            </a>
            </div>
            </div>
            `
}
function randomOrdenate() { 
    let n = dataApi.length
    const arr = []
    containerCards.innerHTML = ``
    for (let index = 0; index < dataApi.length; index++) {
        arr[index] = index + 1
        arr.sort(() => Math.random() > 0.5 ? 1 : -1)
    }
    containerCards.innerHTML += `
        <div class="card not-fit" style="width: 18rem;" onClick="randomOrdenate()">
            <button class="random">Organizar Aleatoriamente</button>
        </div>
    `
    dataApi.forEach(function (element,index) {
        containerCards.innerHTML += `
        <div class="card" style="width: 18rem;" onClick="filterCountry(${arr[index]})">
        <div class="container-image">
        <img  src="${dataApi[arr[index]].flag}" class="card-img-top" alt="${dataApi[arr[index]].name}">
        </div>
        <div class="card-body">
        <h5 class="card-title">País: ${dataApi[arr[index]].name}</h5>
        <div id="container-currencies">
        <ul>
            <li class="name-currenci"><b>Moneda:</b> ${dataApi[arr[index]].currencies[0].name}</li>
            <li class="symbol-currenci"><b>Signo:</b> ${dataApi[arr[index]].currencies[0].symbol}</li>
            <li class="code-currency"><b>Código:</b> ${dataApi[arr[index]].currencies[0].code}</li>
        </ul>
        </div>
        <a href="#" class="whatch-more">
            <button>
                Ver mas información
            </button>
        </a>
        </div>
        </div>
        `
    })
 }
