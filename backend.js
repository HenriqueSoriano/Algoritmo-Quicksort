let valores = [];
let estado = [];
let ordem;
let count = 0;
let largura = 30;
let velocicade = 50;

function pegaValorQuant() {

    // Atualizar label de output e quantidade de valores(gerando novos valores)
    if (count == 1) {
        return;
    } else {
        let i = document.getElementById('quant'),
            o = document.getElementById('outQuant');
            

        o.innerHTML = floor(width / i.value);

        i.addEventListener('quant', function () {
        o.innerHTML = i.value;
        }, false);

        largura = i.value;

        gerador(largura);
    }
}

function pegaValorVel(val) {

    // Atualizar label de output
    velocicade = document.getElementById('vel').value=val;

    let i = document.getElementById('vel'),
        o = document.getElementById('outVel');

    o.innerHTML = i.value;

    i.addEventListener('quant', function () {
    o.innerHTML = i.value;
    }, false);
}

var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);

// Execuções, Criações e Atualizações
function setup() {
  var canva = createCanvas(windowWidth - 336, windowHeight - 285);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canva.position(x, y);

  geradorPrimario(largura);

  root.style.setProperty('--margin', `${width}px`);

  // Comando p5 para atualizações(frames) do canva por segundo
  frameRate(120);
}

// Função para gerar os valores ao abrir a página
function geradorPrimario(larg) {
    valores = new Array(floor(width / larg));
    for (let i = 0; i < valores.length; i++) {
    valores[i] = random(height);
    estado[i] = -1;
    }
}

// Função para gerar os valores ao selecionar o botão
function gerador(w) {
    if (count == 1) {
        return;
    } else if (count == 0) {
        valores = new Array(floor(width / w));
        for (let i = 0; i < valores.length; i++) {
            valores[i] = random(height);
            estado[i] = -1;
        }
    }
}

// Função para verificar se o Array ja está ordenado
async function checarOrdem(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {
            ordem = false;
            break;
        } else {
            ordem = true;
            continue;
        }
    }
}

// Call para a função quicksort, com verificações'
async function callQuicksort(arr, comeco, fim) {

    if (count == 1) {
        return;
    } else if (count == 0) {
        await checarOrdem(arr);

        if (ordem == true) {
            return; 
        } else if (ordem == false) {
            count = 1;
            await quickSort(arr, comeco, fim);
            count = 0;
        }  
    }
}

// Algorítmo parte 2: Executar a primeira parte do algorítmo em partes separadas do Array, dividindo-o o máximo possível
async function quickSort(arr, comeco, fim) {

    // Verificar se a parte é constituida por apenas um valor ou além, caso sim, nada ocorre(return;)
    if (comeco >= fim) {
        return;
    }

    // Divisão do Array em partes a partir do indice retornado na função ordenar() e execução da própria função em menores partes do Array
    let indice = await partition(arr, comeco, fim);
    estado[indice] = -1;
    await Promise.all([
        quickSort(arr, comeco, indice - 1),
        quickSort(arr, indice + 1, fim)
    ]);
}

// Algorítmo parte 1: Identificar Array e pontos de partida e chegada para comparar e comparar valores para organizar chamando a função troca()
async function partition(arr, comeco, fim) {
    
    for (let i = comeco; i < fim; i++) {
        estado[i] = 1;
    }

    let pivoIndice = comeco;
    let pivoValor = arr[fim];
    estado[pivoIndice] = 0;

    // Verificar se valores são menores que outros para trocá-los(trocar()), deixando-os em ordem
    for (let i = comeco; i < fim; i++) {
        if (arr[i] < pivoValor) {
            await trocar(arr, i, pivoIndice);
            estado[pivoIndice] = -1;
            pivoIndice++;
            estado[pivoIndice] = 0;
        }
    }

    // Fazer a última troca para organizar indice e último valor
    await trocar(arr, pivoIndice, fim);

    for (let i = comeco; i < fim; i++) {
        if (i != pivoIndice) {
            estado[i] = -1;
        }
    }

    return pivoIndice;
}

// Função para troca de posição dos valores
async function trocar(arr, a, b) {

    await delay(velocicade);

    let varTemporaria = arr[a];
    arr[a] = arr[b];
    arr[b] = varTemporaria;
}

// Criações e atualizações de ambiente e corpos
function draw() {
  background('#DBE8E1');

  for (let i = 0; i < valores.length; i++) {
    noStroke();

    // Verifica se valor é indice para definir cor
    if (estado[i] == 0) {
        fill('#04D4F0');
    } else if (estado[i] == 1) {
            fill('#059DC0');
    } else {
        fill('#004369');
    }

    // Criação dos corpos forma(coordenadaX, coordenadaY, largura, altura)
    rect(i * largura, height - valores[i], largura, valores[i]);
  }
}

// Função para desacelerar processo de troca para melhor visualização
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}