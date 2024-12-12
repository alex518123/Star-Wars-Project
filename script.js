// Armazena a URL inicial da API de personagens de Star Wars (SWAPI), ou seja, 
// o endpoint da API que vamos usar para fazer a requisição e obter os dados da API
// let: Usado para declarar uma variável cujo valor pode ser alterado, será mudado entre páginas (redeclarar variável) 
// (nesse caso, será atualizado à medida que o usuário navega entre as páginas de personagens).
// 'https://swapi.dev/api/people/' aponta para a lista inicial de personagens fornecida pela SWAPI. 
// Cada página da API retorna até 10 personagens por padrão.

// O try it now no swapi.dev mostra um exemplo de uma requisição bem-sucedida, podemos obter as starships, os personagens, os planetas
// Vamos focar no people tal como no result. Como queremos WebTransportBidirectionalStream, vai ser só people e não people/1
// Se digitar só people lá e der enter vai aparecer todos os personagens (82)
// Cada personagem é um objeto. Não usaremos todas as informações dos objetos

let currentPageUrl = 'https://swapi.dev/api/people/';


// O evento window.onload garante que o código só será executado após todos os elementos do DOM (imagens, botões, etc.) terem sido carregados.
// Toda vez que a página for carregada ou recarregada, a arrow função vai ser chamada
// Função assíncrona (async): Permite o uso de await para operações assíncronas, como chamadas à API.

// try (tente): Se for bem sucedido vai executar o que estiver dentro dele
// Chama a função loadCharacters para buscar e renderizar os personagens da URL inicial, faz a requisição à API para gerar nossos cards
// await faz com que o código "espere" a resolução da função loadCharacters antes de continuar, 
// garantindo que os personagens sejam carregados antes de executar os próximos passos.

// A f(x) loadCharacters vai ser a principal do projeto, ela vai pegar a url e fazer uma requisição para a API por meio dessa url, 
// trazendo os resultados dessa requisição, transformando-os em cards. Seu argumento será a url
// aqui chamamos a função, mais adiante vamos definir a função

// catch (capture): caso try não dê certo, vai executar o que estiver dentro dele
// Caso ocorra um erro na função assíncrona loadCharacters, o erro será capturado e tratado. O argumento será o error
// console.log(error) exibe informações detalhadas sobre o erro no console do navegador (útil para depuração).
// alert('Erro ao carregar cards') mostra uma mensagem ao usuário caso ocorra um problema.

// Fluxo: window.onload (toda vez que a pg for carregada), ele vai chamar uma f(x)
// Essa f(x) vai fazer a tentativa de executar a função loadCharacters, se bem sucedida a tarefa dentro dela vai ser executada
// Caso não dê certo, o erro vai p/ o console e vai exibir um alert ao UserActivation.

// document.getElementById('next-button'): Obtém o elemento HTML com o ID next-button (presumidamente um botão de navegação para a próxima página).
// Esse é o id (next e back-button) que estão lá no HTML
// addEventListener('click', loadNextPage): Adiciona um ouvinte de eventos ao botão para ouvir cliques.
// Dentro dele colocamos qual evento queremos monitorar e o que fazer qdo esse evento ocorrer
// O evento que queremos monitorar é o click, quando ele ocorrer vamos para a pg seguinte ou p/ anterior (loadPreviousPage)
// Quando o botão é clicado, a função loadNextPage é chamada para carregar os personagens da próxima página da API.

// Semelhante ao botão de próxima página, mas configura o botão com ID back-button para chamar a função loadPreviousPage ao ser clicado.
// A função deve navegar para a página anterior da API.
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

// Resumo:
// Este trecho configura o carregamento inicial da página e a navegação entre as páginas de personagens:
// Carregamento inicial:
// Faz uma requisição à API para carregar a primeira página de personagens quando o site é aberto. ENVIA REQUISIÇÃO A API
// Usa o try-catch para lidar com falhas, exibindo mensagens no console e alertas ao usuário.
// Navegação entre páginas:
// Configura os botões "Próxima" e "Anterior" para chamar funções específicas quando clicados.
// A interação com esses botões permite ao usuário navegar entre as páginas de personagens.





// Essa parte do código é crucial para o funcionamento da aplicação, pois carrega e exibe os personagens da API e 
// configura a interação com os cartões e o modal. 

// Função loadCharacters(url) - Assíncrona: Usa async/await para lidar com operações assíncronas (chamada da API).
// Recebe a URL como parâmetro, o que permite reutilizar a função para diferentes páginas da API.
// Agora sium estamos definindo a função, toda vez que a f for chamada, ela vai esperar receber o argumento, uma url
// RECEBE A REQUISIÇÃO

// Limpeza do conteúdo existente
// Estamos manipulando elementos com o DOM. Vai pegar o elemento do HTML cujo Id é o elemento que queremos manipular (o main-content)
// getElementById('main-content'): Seleciona o contêiner principal onde os cartões de personagens serão inseridos.
// innerHTML = '': Remove todo o conteúdo existente para evitar duplicações quando novos personagens são carregados.
// Ao clicar no "Próxima" para carregar mais 10 cards, vai limpar os 10 anteriores.
// Se não fizer isso vai acumulando os cards ao passar de página para pagina (10 + 10 + 10)
// É dentro do contêiner main-content que fica nossos cards

// Requisição à API
// fetch(url): Faz uma requisição HTTP GET à API usando a URL fornecida. REQUISIÇÃO SENDO USADA AQUI
// await: Aguarda a resposta da API antes de prosseguir.
// response.json(): Converte a resposta (dados equisitados da API) em JSON para manipulá-la como um objeto JavaScript e poder iterar sobre ele

// Renderização de personagens
// Itera sobre a lista de personagens (objetos do array) retornada pela API (responseJson.results) usando o método forEach.
// Dentro do forEach teremos uma f(x) anônima que vai iterar por cada objeto do array, ou seja, cada personagem
// Dentro desta f(x) anônima vamos criar os cards dos personagens
// O .results é porque os personagens ao olhar a documentação da API (SWAPI) estão dentro de um results
// O response.JSON equivale a tudo que é exibido dentro daquele result (name, height, mass, eye_color...)
// Portanto, quando pegamos o responseJSON.results, vai pegar apenas as informações dos personagens (name, height...)

// Para cada personagem dentro do forEach:
// 4.1. Criação do cartão
// document.createElement("div"): Cria um elemento/tag HTML <div> para o cartão. Pode criar um novo h1 ou até span com esse método, só " "
// É justamente graças a isso que não precisamos criar cartão por cartão como mostrado nas anotações do HTML lá embaixo
// style.backgroundImage: Define uma imagem de fundo baseada no ID do personagem obtido da URL da API.
// Se não fizer aquele método replace, todo cartão será o Luke Skywalker, pois o ID do Luke Skywalker é 1, e o ID do Darth Vader é 2
// A template string é para concatenar variáveis, nesse caso, o ID do personagem (character.url)
// character.url.replace(/\D/g, ""): Extrai apenas os números da URL (o ID do personagem) com expressão regular
// Na url "https://swapi.dev/api/people/1/" extrair o 1, o id, que é o que queremos
// character.url pega a url da chave character que tem o id do personagem
// className: Aplica a classe CSS e HTML "cards" ao elemento.

// 4.2. Criação do contêiner para o nome
// Cria um fundo escuro (character-name-bg) e exibe o nome do personagem (character-name) como sobreposição.
// innerText: Define o texto do elemento como o nome do personagem, modificando-o a cada personagem, limpando o conteúdo anterior a cada iteração.
// O nome da chave é name

// 4.3. Adição do nome ao cartão
// appendChild: Adiciona o nome como filho do contêiner e o contêiner como filho do cartão.
// Isso pois character-name está dentro de character-name-bg, que por sua vez dentro de cards (anotação final HTML)
// characterNameBG.appendChild(characterName); Pega characterNameBG (pai) e coloca um filho dentro dele, no caso o characterName (o span)
// card.appendChild(characterNameBG); Pega o card (pai) e coloca um filho dentro dele, no caso o characterNameBG

// 4.4. Configuração do clique no cartão
// Quando o cartão é clicado:
// O modal é exibido configurando sua visibility como "visible".
// O conteúdo do modal é preenchido dinamicamente com detalhes do personagem.
// card.onclick = () => {
//   const modal = document.getElementById("modal");
//   modal.style.visibility = "visible";

// 4.5. Detalhes no modal
// Cria e adiciona os detalhes do personagem (nome, altura, peso, etc.) no modal:
// Cada detalhe é criado como um elemento <span>, estilizado pela classe CSS character-details e preenchido com os dados 
// correspondentes do personagem.
// const name = document.createElement("span");
// name.className = "character-details";
// name.innerText = `Nome: ${character.name}`;

// 4.6. Adição ao modal
// Todos os elementos criados (imagem, nome, altura, etc.) são adicionados ao contêiner do modal
// modalContent.appendChild(characterImage);
// modalContent.appendChild(name);
// modalContent.appendChild(characterHeight);
// modalContent.appendChild(mass);
// modalContent.appendChild(eyeColor);
// modalContent.appendChild(birthYear);

async function loadCharacters(url) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Limpa os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((character) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
      card.className = "cards"
      // DIV CARDS, DEU BACKGROUNDIMAGE P/ ELA, CRIOU UMA CLASSE PARA ELA, ou seja, criou o card 

      const characterNameBG = document.createElement("div")
      characterNameBG.className = "character-name-bg"
      // CRIAMOS A DIV DE FUNDO PARA O NOME, DEMOS SUA CLASSE

      const characterName = document.createElement("span")
      characterName.className = "character-name"
      characterName.innerText = `${character.name}`
      characterNameBG.appendChild(characterName)
      card.appendChild(characterNameBG)
      // CRIAMOS O SPAN COM O NOME E ADICIONAMOS AO DIV CARDS

      card.onclick = () => {
        const modal = document.getElementById("modal")
        modal.style.visibility = "visible"
        const modalContent = document.getElementById("modal-content") // modal-content é a div onde fica o conteudo do modal
        modalContent.innerHTML = ''        // Limpar todos os elementos do o conteudo do modal

        const characterImage = document.createElement("div")  // Queremos a mesma imagem do card que estivermos clicando: url
        characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
        characterImage.className = "character-image"  // Criamos uma classe para a imagem (como se tivesse no HTML) que será estilizada no css

        // Agora vamos criar um span para cada característica do personagem: 
        // Todos os spans serão estilizados pela classe CSS character-details, para facilitar na hora de estilizar (estiliza tudo de uma vez)
        // as chaves name, height, mass, eye_color, e birth_year são propriedades do objeto retornado no campo results do responseJson 
        // da API SWAPI para os personagens. Esses campos estão disponíveis diretamente nos objetos que descrevem cada personagem.
        // Quando você faz uma requisição para https://swapi.dev/api/people/, o JSON retornado tem uma estrutura de dados
        // Ex: "previous": null, // URL da página anterior (null se na primeira página)
        // Também será necessário criar funções para converter os dados que recebemos da API
        const name = document.createElement("span")
        name.className = "character-details"
        name.innerText = `Nome: ${character.name}`

        const characterHeight = document.createElement("span")
        characterHeight.className = "character-details"
        characterHeight.innerText = `Altura: ${convertHeight(character.height)}`

        const mass = document.createElement("span")
        mass.className = "character-details"
        mass.innerText = `Peso: ${convertMass(character.mass)}`

        const eyeColor = document.createElement("span")
        eyeColor.className = "character-details"
        eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}` // Chamou a f(x) com o argumento character.eye_color

        const birthYear = document.createElement("span")
        birthYear.className = "character-details"
        birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

        // Adiciona todos os spans criados ao modalContent
        modalContent.appendChild(characterImage)
        modalContent.appendChild(name)
        modalContent.appendChild(characterHeight)
        modalContent.appendChild(mass)
        modalContent.appendChild(eyeColor)
        modalContent.appendChild(birthYear)
      }
      const mainContent = document.getElementById('main-content');
      mainContent.appendChild(card);

    });

    // Habilita ou desabilita os botões de acordo com a presença de URLs de próxima e página anterior
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');
    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;

    backButton.style.visibility = responseJson.previous ? "visible" : "hidden";

    currentPageUrl = url;
  } catch (error) {
    throw new Error('Erro ao carregar personagens');
  }
}

// 5. Adição do cartão ao DOM
// O cartão do personagem é adicionado ao contêiner principal (main-content), exibindo-o na página.
// mainContent.appendChild(card);

// 6. Configuração dos botões de navegação
// responseJson.next: URL da próxima página (se existir) - Habilita/desabilita o botão "Próxima" com base na presença dessa URL.
// responseJson.previous: URL da página anterior (se existir)- Habilita/desabilita e exibe/esconde o botão "Anterior".
// O disabled pode ser T or F, se for T, ele desabilita o botão, se for F (null) ele habilita o botão
// const nexButton e backButton foram copiados lá de cima e colados aqui pois const só tem escopo local, não é um var, só funfa dentro
// Como é outro escopo /não é mais o onload), temos que escrever de novo
// backButton.style.visibility = responseJson.previous ? "visible" : "hidden";   Isso é um operador ternário. Visibility veio do css do back-button
// Na resposta que está vindo da API tem o previous? Uma pg anterior, se existir o visibility fica visible, se não, fica hidden

// 7. Atualização da URL atual
// Atualiza a variável global currentPageUrl para rastrear a página atualmente carregada.
// currentPageUrl = url; Toda vez que a pg for carregada ou clicar botão próxima ou anterior, o valor da url vai mudar dinamicamente
// Por isso, é feita uma nova requisição para a URL atualizada

// 8. Tratamento de erros
// Captura erros na requisição ou manipulação de dados, lançando uma mensagem clara para depuração.
// catch (error) {
//   throw new Error('Erro ao carregar personagens');
// }

// Resumo
// Faz uma requisição à API para buscar personagens.
// Cria cartões personalizados para cada personagem, incluindo imagens e nomes.
// Configura cliques nos cartões para exibir detalhes no modal.
// Habilita/desabilita os botões de navegação com base na presença de páginas anterior/próxima.
// Atualiza o conteúdo da página e gerencia erros de forma robusta.


// 1. Função hideModal
// Objetivo: Esconde o modal.
// getElementById("modal"): Seleciona o elemento modal pelo ID.
// style.visibility = "hidden";: Define a visibilidade do modal como oculta, retirando-o da tela.
// Uso: acionada por um botão "fechar" ou ao clicar fora do modal.

function hideModal() {
  const modal = document.getElementById("modal")
  modal.style.visibility = "hidden"
}

// 2. Função convertEyeColor(eyeColor)
// Criou um objeto chamado cores
// Objetivo: Traduz cores dos olhos fornecidas pela API para português.
// eyeColor.toLowerCase(): Converte o valor recebido para minúsculas, garantindo consistência.
// cores[eyeColor]: Busca a tradução correspondente no objeto cores.
// || eyeColor: Retorna o valor original caso a cor não esteja no objeto (fallback).
// Uso: Exibe a cor dos olhos traduzida no modal.

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
    unknown: "desconhecida"
  };

  // Compara se o valor dentro da API está dentro do objeto cores, se estiver, ele atribui o valor da chave, se não, ele retorna o valor original
  return cores[eyeColor.toLowerCase()] || eyeColor;
}

// 3. Função convertHeight(height)
// Objetivo: Converte a altura do personagem de centímetros para metros e formata com duas casas decimais.
// height === "unknown": Trata alturas desconhecidas, retornando "desconhecida".
// height / 100: Converte centímetros para metros.
// .toFixed(2): Garante que o número terá duas casas decimais.
// Uso: Exibe a altura convertida no modal.

function convertHeight(height) {
  if (height === "unknown") {
    return "desconhecida";
  }
  
  return (height / 100).toFixed(2);
}

// 4. Função convertMass(mass)
// Objetivo: Formata o peso do personagem, adicionando a unidade "kg".
// mass === "unknown": Trata valores desconhecidos, retornando "desconhecido".
// ${mass} kg: Retorna o mesmo peso da API seguido da unidade.
// Uso: Exibe o peso formatado no modal.

function convertMass(mass) {
  if (mass === "unknown") {
    return "desconhecido";
  }
  
  return `${mass} kg`;
}

// 5. Função convertBirthYear(birthYear)
// Objetivo: Trata o ano de nascimento, mantendo o valor original ou substituindo por "desconhecido".
// birthYear === "unknown": Verifica se o valor é desconhecido e retorna "desconhecido".
// Uso: Exibe o ano de nascimento no modal.

function convertBirthYear(birthYear) {
  if (birthYear === "unknown") {
    return "desconhecido";
  }
  
  return birthYear;
}

// 6. Função loadNextPage()
// Objetivo: Carrega os personagens da próxima página usando a URL fornecida pela API.
// Passos:
// Verifica se a URL atual existe.
// Faz uma requisição à API para obter os dados da página atual com fetch, armazenando os dados em response, depois o converte em json.
// Extrai a URL da próxima página (responseJson.next).
// Chama loadCharacters para renderizar os personagens da próxima página.
// Tratamento de erros: Exibe uma mensagem de erro no console e alerta o usuário caso a requisição falhe.

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

// 7. Função loadPreviousPage()
// Objetivo: Carrega os personagens da página anterior usando a URL fornecida pela API.
// Passos:
// Verifica se a URL atual existe.
// Faz uma requisição à API para obter os dados da página atual.
// Extrai a URL da página anterior (responseJson.previous).
// Chama loadCharacters para renderizar os personagens da página anterior.
// Tratamento de erros: Exibe uma mensagem de erro no console e alerta o usuário caso a requisição falhe.

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

// Resumo
// Funções utilitárias: Tratam dados fornecidos pela API (ex.: convertEyeColor, convertHeight).
// Navegação: Gerenciada por loadNextPage e loadPreviousPage, que carregam personagens dinamicamente.
// Modal: Controlado por hideModal, escondendo-o quando necessário.
// Essa abordagem modular organiza o código, facilita a reutilização e melhora a experiência do usuário.