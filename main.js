//Variables globales
let pagina = 1;
let maxPags = 0;

//Funciones
function buscarNombre(nombre) {
    body.style.height="100vh";
    navPaginacion.style.display = 'none';
    const url = 'http://www.omdbapi.com/?apikey=8d0c6c77&t=' + nombre;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                info.innerHTML = `
                <h1>${data.Title}</h1>
                <h2>${data.Year}</h2>
                <img class='mt-2 mb-2' src='${data.Poster}'></img>
                <h3>${data.Language}</h3>
                `;
            } else {
                alert("No se ha encontrado ninguna peli");
            }
        })
        .catch(err => console.log(err))
}

function listarPelis(nombre) {
    info.innerHTML = '';
    const url = 'http://www.omdbapi.com/?apikey=8d0c6c77&s=' + nombre + "&page=" + pagina;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                navPaginacion.style.display = 'block';
                console.log(data);
                let paginacion = parseInt(data.totalResults / 10) + 1;
                maxPags = paginacion;
                goPag.max = maxPags;
                console.log(maxPags);
                for (i of data.Search) {
                    info.innerHTML += `
                <h1>${i.Title}</h1>
                <h2>${i.Year}</h2>
                <img class='mb-5' src='${i.Poster}'></img>
                <br>
                `;
                }
            } else {
                navPaginacion.style.display = 'none';
                alert("No se ha encontrado la pelicula");
            }
        })
        .catch(err => console.log(err));
}



function alante(nombre) {
    habButtons();
    pagina += 1;
    if (maxPags == pagina) {
        next.disabled = true;
    }
    goPag.value = pagina;
    listarPelis(nombre);
}

function atras(nombre) {
    habButtons();
    pagina -= 1;
    if (pagina == 1) {
        prev.disabled = true;
    }
    goPag.value = pagina;
    listarPelis(nombre);
}

function textPag(nombre, pag) {
    if (pag <= maxPags) {
        habButtons();
        pagina = pag;
        if (maxPags == pagina) {
            next.disable = true;
        }
        else if (pagina == 1) {
            prev.disabled = true;
        }
        goPag.value = pagina;
        listarPelis(nombre);
    }
}

function primeraPag(nombre) {
    body.style.height="";
    habButtons();
    pagina = 1;
    prev.disabled = true;
    goPag.value = pagina;
    listarPelis(nombre);
}

function habButtons() {
    prev.disabled = false;
    next.disabled = false;
}