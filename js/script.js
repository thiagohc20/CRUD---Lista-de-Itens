const article = document.querySelector(".item-container");
const add = document.querySelector(".add");
const info = document.querySelector(".input-item");
const cleanAllItens = document.querySelector(".clean-btn");

add.addEventListener("click", addItem);
window.addEventListener("DOMContentLoaded", loadItens);
cleanAllItens.addEventListener("click", deleteAllItens);
//Editar item
let currentInfo;
let editFlag = false;
let editId = ""


function addItem(e) {
  const id = new Date().getTime().toString();
  e.preventDefault();
  //Guarda dados do input
  const value = info.value;
  //Funcao para verificar se o input esta vazio e o editFlag verdadeiro
  if (value !== "" && !editFlag) {
    const div = document.createElement("div");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    div.setAttributeNode(attr);
    div.innerHTML = `<article class="item-list">
        <p class="item-value">${value}</p>
        <div class="item-buttons">
            <button type="button" class="edit"><img src="./assets/editar.png" alt="" srcset=""></button>
            <button type="button" class="delete"><img src="./assets/excluir.png" alt="" srcset=""></button>
          </div>
          </article>`;

          saveValues(id,value)
          removeAllItens()
          successMsgAdd()
          defaultValues();
          //Botao de excluir um item
          const removeButton = div.querySelector(".delete");
          removeButton.addEventListener("click", remover)
          //Botao de editar
          const editButton =  div.querySelector(".edit");
          editButton.addEventListener("click", edit)    
          article.appendChild(div);
  } else if (value !== "" && editFlag === true) {
    //Altera a informação do item
    currentInfo.innerHTML = value;
    //Retorna para os valores padrao
    editCookie(editId,value)
    successEditMsg()
    defaultValues();
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
function msgSucessodeleteAllItens(){
  const msg = document.querySelector('.msgSucessoExcluirTudo')
  msg.classList.add('msg-sucesso-ativo')
  setTimeout(() => {
    msg.classList.remove('msg-sucesso-ativo')
  }, 2000);
}

//Mensagem de sucesso ao add
function successMsgAdd(){
  const msg = document.querySelector('.successMsgAdd')
  msg.classList.add('msg-sucesso-ativo')
  setTimeout(() => {
    msg.classList.remove('msg-sucesso-ativo')
  }, 2000);
}

//Mensagem de sucesso ao editar
function successEditMsg(){
  const msg = document.querySelector('.successEditMsg')
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

//Funcao de excluir todos os itens
function removeAllItens(){
  cleanAllItens.classList.add('clean-btn-ativo')
  if(article.childElementCount === 0){
    cleanAllItens.classList.remove('clean-btn-ativo')
  }
}

//Define os valores padrao
function defaultValues() {
  info.value = "";
  editFlag = false;
  add.value = "adicionar";
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
    removeAllItens()
  }
}

//Função de Editar Itens
function edit(e) {
  currentInfo = e.currentTarget.parentElement.parentElement.querySelector("p");
  //Define true para ser editado
  editFlag = true;
  //Altera o input de "adicione" para a informação atual do texto
  info.value = currentInfo.innerHTML;
  //Muda o nome do botao add
  add.value = "Editar";
  editId = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
}

//Função de excluir todos os itens
function deleteAllItens() {
  if(editFlag === true){
    msgErroEditar()
  }else{
  //Guarda todo conteudo de item container
  const todosOsItens = document.querySelector('.item-container')
  //Seleciona todos os itens e remove
  todosOsItens.querySelectorAll('div').forEach((item) => item.remove())
  // Exclui todos os cookies
  localStorage.removeItem("lista")
  msgSucessodeleteAllItens()
  defaultValues();
  removeAllItens()
  }
}


// ----- Local Storage ------

//Salvar cookie
function saveValues(id, value){
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
function editCookie(id,value){
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
function loadItens() {
  let items = pegarCookie();

  if (items.length > 0) {
    items.forEach((item) => {
      criarItens(item.id, item.value)
    });
    cleanAllItens.classList.add('clean-btn-ativo')
  }
  removeAllItens()
}

function criarItens(id,value){
  const element = document.createElement("div");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<article class="item-list">
  <p class="item-value">${value}</p>
  <div class="item-buttons">
      <button type="button" class="edit"><img src="./assets/editar.png" alt="" srcset=""></button>
      <button type="button" class="delete"><img src="./assets/excluir.png" alt="" srcset=""></button>
    </div>
    </article>`
    //Botao de remover
    const removeButton = element.querySelector(".delete");
    removeButton.addEventListener("click", remover);
    //Botao de editar
    const editButton = element.querySelector(".edit");
    editButton.addEventListener("click", edit);
    article.appendChild(element) 
    console.log(element)
}





