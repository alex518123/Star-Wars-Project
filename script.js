// 1. Definição da URL inicial e variáveis globais
let currentPageUrl = 'https://swapi.dev/api/people/';

// Responsabilidade: Define a URL base da API para buscar os dados da primeira página de personagens.
// Uso futuro: Essa variável é usada ao carregar novos dados (próxima ou anterior página) e ao inicializar a aplicação.

// 2) Funções auxiliares para formatação ou tradução de dados - São chamadas na montagem dos detalhes do personagem no modal.
// Exemplos de funções:
// convertHeight: Altura em centímetros → metros.
// convertMass: Peso bruto → string formatada com "kg".
// convertBirthYear: Ano de nascimento → texto amigável.
function convertEyeColor(eyeColor) {
  const cores = {
    blue: "azul",
    brown: "castanho",
    green: "verde",
    yellow: "amarelo",
    black: "preto",
    pink: "rosa",
    red: "vermelho",
    orange: "laranja",
    hazel: "avela",
    unknown: "desconhecida",
  };

  return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
  if (height === "unknown") {
    return "desconhecida";
  }
  return (height / 100).toFixed(2);
}

function convertMass(mass) {
  if (mass === "unknown") {
    return "desconhecido";
  }
  return `${mass} kg`;
}

function convertBirthYear(birthYear) {
  if (birthYear === "unknown") {
    return "desconhecido";
  }
  return birthYear;
}

// Objetivo: Fecha o modal ao clicar fora dele
function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

// 3) Funções principais
// a) Carregar personagens da API
async function loadCharacters(url) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Limpa resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    //   Responsabilidade:
    // Limpar conteúdo anterior: Garante que os personagens carregados anteriormente não sejam duplicados.
    // Buscar dados da API: Faz a requisição para a URL fornecida.
    // Converter resposta: Transforma os dados brutos da API em um formato manipulável (JSON).

    // Renderizar cada personagem no DOM
    responseJson.results.forEach((character) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
      card.className = "cards";
    //   Objetivo:
    //   Criar dinamicamente elementos div que representam os personagens como cards.
    //   Configurar a imagem de fundo do card com base no ID do personagem extraído da URL da API.

      // Criar nome do personagem - Adicionar o nome do personagem ao card, estilizado com elementos HTML e classes CSS
      const characterNameBG = document.createElement("div");
      characterNameBG.className = "character-name-bg";

      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${character.name}`;

      characterNameBG.appendChild(characterName);
      card.appendChild(characterNameBG);

    // Configurar clique para abrir modal - Adicionar funcionalidade de abrir modal
    // Configurar um evento onclick para exibir um modal ao clicar no card.
    // Garante que o conteúdo do modal seja atualizado para o personagem específico.
      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";
        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const characterImage = document.createElement("div");
        characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
        characterImage.className = "character-image";

        // Inserir detalhes do personagem no modal
        // Detalhes exibidos: Nome, altura, peso, cor dos olhos e ano de nascimento.
        // Usa funções auxiliares (convertEyeColor, convertHeight, etc.) para formatar os dados.

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `Nome: ${character.name}`;

        const characterHeight = document.createElement("span");
        characterHeight.className = "character-details";
        characterHeight.innerText = `Altura: ${convertHeight(character.height)}`;

        const mass = document.createElement("span");
        mass.className = "character-details";
        mass.innerText = `Peso: ${convertMass(character.mass)}`;

        const eyeColor = document.createElement("span");
        eyeColor.className = "character-details";
        eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`;

        const birthYear = document.createElement("span");
        birthYear.className = "character-details";
        birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`;

        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(characterHeight);
        modalContent.appendChild(mass);
        modalContent.appendChild(eyeColor);
        modalContent.appendChild(birthYear);
      };

      // Adicionar card ao container principal
      mainContent.appendChild(card);
    });

    // Gerenciar navegação entre páginas
    // Configurar botões de navegação - Se não houver próxima página, desativa o botão Próximo.
    // Se não houver página anterior, desativa ou oculta o botão Voltar.
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');
    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;
    backButton.style.visibility = responseJson.previous ? "visible" : "hidden";

    currentPageUrl = url; // Atualiza a URL atual
  } catch (error) {
    throw new Error('Erro ao carregar personagens');
  }
}

// b) Funções de navegação entre páginas (def)
// Responsabilidade: Atualizar o currentPageUrl e chamar loadCharacters com a próxima ou a página anterior.
// Reutiliza loadCharacters para exibir os novos dados
async function loadNextPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.next);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar a próxima página');
  }
}

async function loadPreviousPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.previous);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar a página anterior');
  }
}

// 4) Configuração de eventos e Inicialização da página ao carregar
// Propósito: Configurar os eventos iniciais ao carregar a página e os eventos de clique nos botões Próximo e Volta:
window.onload = async () => {
  try {
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar cards');
  }

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);

  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);
};