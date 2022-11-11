const adicionar = document.querySelector(".adicionar");
const article = document.querySelector(".item-container");
const info = document.querySelector(".input-item");

adicionar.addEventListener("click", adicionarItem);

window.addEventListener('DOMContentLoaded', carregarItens);

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
    msgSucessoAdd()
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
    msgSucessoEditar()
    valoresPadrão();
  }
}
//Tratamento de erro
//Mensagem sucesso ao excluir
function msgSucessoExcluir(){
  const msg = document.querySelector('.msgSucessoExcluir')
  msg.classList.add('msg-sucesso-ativo')
  setTimeout(() => {
    msg.classList.remove('msg-sucesso-ativo')
  }, 2000);
}

//Mensagem sucesso ao excluir todos os itens
function msgSucessoExcluirTodosOsItens(){
  const msg = document.querySelector('.msgSucessoExcluirTudo')
  msg.classList.add('msg-sucesso-ativo')
  setTimeout(() => {
    msg.classList.remove('msg-sucesso-ativo')
  }, 2000);
}

//Mensagem de sucesso ao adicionar
function msgSucessoAdd(){
  const msg = document.querySelector('.msgSucessoAdd')
  msg.classList.add('msg-sucesso-ativo')
  setTimeout(() => {
    msg.classList.remove('msg-sucesso-ativo')
  }, 2000);
}

//Mensagem de sucesso ao editar
function msgSucessoEditar(){
  const msg = document.querySelector('.msgSucessoEditar')
  msg.classList.add('msg-sucesso-ativo')
  setTimeout(() => {
    msg.classList.remove('msg-sucesso-ativo')
  }, 2000);
}

//Mensagem de erro ao editar
function msgErroEditar(){
  const msg = document.querySelector('.msgErroEditar')
  msg.classList.add('msg-sucesso-ativo')
  setTimeout(() => {
    msg.classList.remove('msg-sucesso-ativo')
  }, 2000);
}

//Mensagem de erro campo vazio
function msgErroCampoVazio(){
  const msg = document.querySelector('.msgErroCampoVazio')
  msg.classList.add('msg-sucesso-ativo')
  setTimeout(() => {
    msg.classList.remove('msg-sucesso-ativo')
  }, 2000);
}



//Define os valores padrao
function valoresPadrão() {
  info.value = "";
  editFlag = false;
  adicionar.value = "Adicionar";
}

//Função de remover Itens
function remover(e) {
  if(editFlag === true){
    msgErroEditar()
  }else{
    const element = e.currentTarget.parentElement.parentElement.parentElement;
    const id = element.dataset.id
    element.remove();
    msgSucessoExcluir()
    excluirCookie(id)
  }
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
  // Exclui todos os cookies
  localStorage.removeItem("lista")
  msgSucessoExcluirTodosOsItens()
  valoresPadrão();
}


// ----- Local Storage ------

//Salvar cookie
function salvarValores(id, value){
  const listItens = {id,value}
  let itens = pegarCookie()
  itens.push(listItens)
  localStorage.setItem("lista", JSON.stringify(itens))
}

//Retornar o cookie salvo
function pegarCookie(){
  return localStorage.getItem("lista")
  ? JSON.parse(localStorage.getItem("lista"))
  : []
}

//Exluir cookie
function excluirCookie(id){
  let itens = pegarCookie()
   itens = itens.filter(function (item){
    if(item.id !== id){
      return item
    }
  })
  localStorage.setItem("lista", JSON.stringify(itens))
}

//Editar cookie
function editarCookie(id,value){
  let itens = pegarCookie()
  itens = itens = itens.map(function (item){
    if(item.id === id){
      item.value = value
    }
    return item
  })
  localStorage.setItem("lista", JSON.stringify(itens))
}


// ----- Inicialização ------

//Carrega os itens salvos no local storage
function carregarItens(){
  let itens = pegarCookie()
  if(itens.length > 0){
    itens.forEach(function(item){
      const div = document.createElement("div");
      let attr = document.createAttribute("data-id");
      attr.value = item.id;
      div.setAttributeNode(attr);
      div.innerHTML = `<article class="item-list">
          <p class="item-value">${item.value}</p>
          <div class="item-buttons">
              <button type="button" class="editar"><img src="./assets/editar.png" alt="" srcset=""></button>
              <button type="button" class="excluir"><img src="./assets/excluir.png" alt="" srcset=""></button>
            </div>
            </article>`;

      //Botao de excluir um item      
      const botaoRemover = document.querySelectorAll(".excluir");
      botaoRemover.forEach((item) => item.addEventListener("click", remover));
      //Botao de editar
      const botaoEditar = document.querySelectorAll(".editar");
      botaoEditar.forEach((item) => item.addEventListener("click", editar));
      //Adicionar o item ao container
      article.appendChild(div);
    })
  }
}




