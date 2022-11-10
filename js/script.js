const adicionar = document.querySelector(".adicionar");
const article = document.querySelector(".item-container");
const info = document.querySelector(".input-item");

adicionar.addEventListener("click", adicionarItem);

let infoAtual;
let editFlag = false;
let editId = ""

function adicionarItem(e) {
  const id = new Date().getTime().toString();
  e.preventDefault();
  //Guarda dados do input
  const valor = info.value;
  //Funcao para verificar se o input esta vazio e o editFlag verdadeiro
  if (valor !== "" && !editFlag) {
    const div = document.createElement("div");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    div.setAttributeNode(attr);
    div.innerHTML = `<article class="item-list">
        <p class="item-value">${valor}</p>
        <div class="item-buttons">
            <button type="button" class="editar"><img src="./assets/editar.png" alt="" srcset=""></button>
            <button type="button" class="excluir"><img src="./assets/excluir.png" alt="" srcset=""></button>
          </div>
          </article>`;

    article.appendChild(div);
    salvarValores(id,valor)
    valoresPadrão();
    //Botao de excluir um item
    const botaoRemover = document.querySelectorAll(".excluir");
    botaoRemover.forEach((item) => item.addEventListener("click", remover));
    //Botao de editar
    const botaoEditar = document.querySelectorAll(".editar");
    botaoEditar.forEach((item) => item.addEventListener("click", editar));
    //Botao excluir todos os itens
    const botaoExcluirTodosItens = document.querySelector(".limpar-btn")
    botaoExcluirTodosItens.addEventListener('click', excluirTodosOsItens)

  } else if (valor !== "" && editFlag === true) {
    const itemClicado = e.currentTarget.parentElement.parentElement.parentElement.querySelector('.item-value').innerText
    //Altera a informação do item
    infoAtual.innerHTML = valor;
    //Retorna para os valores padrao
    editarCookie(editId,valor)
    valoresPadrão();
  }
}

//Define os valores padrao
function valoresPadrão() {
  info.value = "";
  editFlag = false;
  adicionar.value = "Adicionar";
}

//Função de remover Itens
function remover(e) {
  const element = e.currentTarget.parentElement.parentElement.parentElement;
  const id = element.dataset.id
  element.remove();
  excluirCookie(id)
}

//Função de Editar Itens
function editar(e) {
  infoAtual = e.currentTarget.parentElement.parentElement.querySelector("p");
  //Define true para ser editado
  editFlag = true;
  //Altera o input de "adicione" para a informação atual do texto
  info.value = infoAtual.innerHTML;
  //Muda o nome do botao adicionar
  adicionar.value = "Editar";
  editId = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
}

//Função de excluir todos os itens
function excluirTodosOsItens() {
  //Guarda todo conteudo de item container
  const todosOsItens = document.querySelector('.item-container')
  //Seleciona todos os itens e remove
  todosOsItens.querySelectorAll('div').forEach((item) => item.remove())
  valoresPadrão();
}


// ----- Local Storage ------

//Salvar cookie
function salvarValores(id, value){
  const listItens = {id,value}
  let teste = pegarCookie()
  teste.push(listItens)
  localStorage.setItem("lista", JSON.stringify(teste))
}

//Retornar o cookie salvo
function pegarCookie(){
  return localStorage.getItem("lista")
  ? JSON.parse(localStorage.getItem("lista"))
  : []
}

//Exluir cookie
function excluirCookie(id){
  //Item clicado
  let itens = pegarCookie()
  const teste = itens.filter(function (item){
    if(item.id !== id){
      return item
    }
  })
    
  localStorage.setItem("lista", JSON.stringify(teste))
}

//Editar cookie
function editarCookie(id,value){
  console.log(value)
  let itens = pegarCookie()
  itens = itens.map(function (item){
    if(item.id === id){
      return item.value = value
    }
    return item
  })
    
  console.log(itens)
}

