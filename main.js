function buscarNombre(nombre) {
    const url = 'http://www.omdbapi.com/?apikey=8d0c6c77&t=' + nombre

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            info.innerHTML = `
        <p>${data.Title}</p>
        <p>${data.Year}</p>
        <img src='${data.Poster}'></img>
        <p>${data.Language}</p>
        `;
        })
        .catch(err => console.log(err))
}