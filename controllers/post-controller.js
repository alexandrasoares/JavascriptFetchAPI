const listaPost = document.querySelector('.lista-post');
const postForm = document.querySelector('.post-form');

// Variaveis Formulário
const tituloValue = document.getElementById('titulo-value');
const conteudoValue = document.getElementById('titulo-value');

// Variavel para chamada da API
const urlAPI = 'http://localhost:3000/post'
let dadosCard = '';

const exibirPosts = (cardsPost) => {
    Array.from(cardsPost).forEach(post => {
        dadosCard += `
        <div class="card mt-4 col-md-6 bg-ligt">
        <div class="card-body" data-id="${post.id}">
          <h5 class="card-title">${post.titulo}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${post.data}</h6>
          <p class="card-text">
            ${post.conteudo}
          </p>
          <a href="#" class="card-link" id="edita"> Editar </a>
          <a href="#" class="card-link" id="exclui"> Excluir </a>
        </div>
      </div>
        `;
    });
    listaPost.innerHTML = dadosCard;
}

// METODO GET

fetch(urlAPI)
    .then(s => s.json())
    .then(dados => exibirPosts(dados))

// METODO POST 

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(urlAPI, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            titulo: tituloValue.value,
            conteudo: conteudoValue.value,
        })
    })
    .then(res => res.json())
    .then(data =>{
        const postLista = [];
        postLista.push(data);
        exibirPosts(postLista);
    })

})

// METODO DELETE

listaPost.addEventListener('click', (d) => {
    window.location.href = '';
    // d.preventDefault();

    // let id = d.target.parentElement.dataset.id;

    // fetch(`${urlAPI}/${id}`, {
    //     method: 'DELETE'
    // })
    //     .then(res => res.json())
    //     .then(() => location.reload())
})

// METODO PUT


listaPost.addEventListener('click', (p) => {
    e.preventDefault();

    const editaItem = p.target.parentElement;
    let titulo = editaItem.querySelector('card-title').textContent;
    let conteudo = editaItem.querySelector('card-text').textContent;

    tituloValue.value = titulo;
    conteudoValue.value = conteudo;

    // fetch(`${urlAPI}/${id}`, {
    //     method: 'DELETE'
    // })
    //     .then(res => res.json())
    //     .then(() => location.reload())
})

