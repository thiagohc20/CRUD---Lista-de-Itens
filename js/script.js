const adicionar = document.querySelector(".adicionar");
const article = document.querySelector(".item-container");
const info = document.querySelector(".input-item");


adicionar.addEventListener("click", adicionarItem);
let editFlag = false;
function adicionarItem(e) {
  const valor = info.value;
  e.preventDefault();
  if (valor !== "" && !editFlag) {
    const div = document.createElement("div");
    div.innerHTML = `<article class="item-list">
        <p class="item-value">${info.value}</p>
        <div class="item-buttons">
            <button type="button" class="editar"><img src="./assets/editar.png" alt="" srcset=""></button>
            <button type="button" class="excluir"><img src="./assets/excluir.png" alt="" srcset=""></button>
          </div>
          </article>`;

    article.appendChild(div);
    valoresPadrão();
    if (div) {
      //Botao de Remover
      const botaoRemover = document.querySelectorAll(".excluir");
      botaoRemover.forEach((item) => item.addEventListener("click", remover));
      //Botao de Editar
    }
  }else if(valor !== "" && editFlag === true){
    //Altera a informação do item
    article.querySelector('p').innerText = info.value
    //Retorna para os valores padrao
    valoresPadrão();
  }
  const botaoEditar = document.querySelectorAll(".editar");
  botaoEditar.forEach((item) => item.addEventListener("click", editar));
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
  element.remove();
}

//Função de Editar Itens
function editar() {
  //Define true para ser editado
  editFlag = true
  //Altera o valor de "adicione" para a informação atual do texto
  info.value = article.querySelector('p').innerText
  //Muda o nome do botao adicionar
  adicionar.value = "Editar";
}
