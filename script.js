// module de tabuleiro
const COR_INICIAL_X = "#30bced";
const COR_INICIAL_O = "#679436";

const tabuleiro = (() => {
  const _tabuleiro = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const _verificarVitoria = () => {
    // linhas
    if (_tabuleiro[0][0] !== "") {
      if (
        _tabuleiro[0][1] === _tabuleiro[0][0] &&
        _tabuleiro[0][2] === _tabuleiro[0][0]
      ) {
        return _tabuleiro[0][0];
      }
    }

    if (_tabuleiro[1][0] !== "") {
      if (
        _tabuleiro[1][1] === _tabuleiro[1][0] &&
        _tabuleiro[1][2] === _tabuleiro[1][0]
      ) {
        return _tabuleiro[1][0];
      }
    }

    if (_tabuleiro[2][0] !== "") {
      if (
        _tabuleiro[2][1] === _tabuleiro[2][0] &&
        _tabuleiro[2][2] === _tabuleiro[2][0]
      ) {
        return _tabuleiro[2][0];
      }
    }

    // colunas
    if (_tabuleiro[0][0] !== "") {
      if (
        _tabuleiro[1][0] === _tabuleiro[0][0] &&
        _tabuleiro[2][0] === _tabuleiro[0][0]
      ) {
        return _tabuleiro[0][0];
      }
    }

    if (_tabuleiro[0][1] !== "") {
      if (
        _tabuleiro[1][1] === _tabuleiro[0][1] &&
        _tabuleiro[2][1] === _tabuleiro[0][1]
      ) {
        return _tabuleiro[0][1];
      }
    }

    if (_tabuleiro[0][2] !== "") {
      if (
        _tabuleiro[1][2] === _tabuleiro[0][2] &&
        _tabuleiro[2][2] === _tabuleiro[0][2]
      ) {
        return _tabuleiro[0][2];
      }
    }

    // diagonais
    if (_tabuleiro[0][0] !== "") {
      if (
        _tabuleiro[1][1] === _tabuleiro[0][0] &&
        _tabuleiro[2][2] === _tabuleiro[0][0]
      ) {
        return _tabuleiro[0][0];
      }
    }

    if (_tabuleiro[0][2] !== "") {
      if (
        _tabuleiro[1][1] === _tabuleiro[0][2] &&
        _tabuleiro[2][0] === _tabuleiro[0][2]
      ) {
        return _tabuleiro[0][2];
      }
    }

    // ninguem ganhou ainda
    return -1;
  };
  const limpar = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        _tabuleiro[i][j] = "";
      }
    }
  };
  const jogar = (linha, coluna, simbolo) => {
    if (_tabuleiro[linha][coluna] === "") {
      _tabuleiro[linha][coluna] = simbolo;
    }
    return _verificarVitoria();
  };

  return { limpar, jogar };
})();

// fabrica de jogadores
const Jogador = (nome, simbolo, cor) => {
  let _nome = nome;
  let _simbolo = simbolo;
  let _cor = cor;
  let _vitorias = 0;

  const alterarNome = (novoNome) => {
    _nome = novoNome;
  };
  const verNome = () => _nome;
  const verSimbolo = () => _simbolo;
  const alterarCor = (novaCor) => {
    _cor = novaCor;
    if (_simbolo == "X") {
      placarHtml.definirCorX(_cor);
    } else {
      placarHtml.definirCorO(_cor);
    }
  };
  const verCor = () => _cor;
  const novaVitoria = () => {
    _vitorias++;
  };
  const verVitorias = () => _vitorias;
  const zerarVitorias = () => (_vitorias = 0);

  return {
    alterarNome,
    verNome,
    verSimbolo,
    alterarCor,
    verCor,
    novaVitoria,
    verVitorias,
    zerarVitorias,
  };
};

// elementos html do placar
const placarHtml = (() => {
  // nodes referentes ao placar do jogador com X
  const _nomeX = document.getElementById("nome-x");
  const _pontosX = document.getElementById("pontos-x");
  const _iconeX = document.getElementById("icone-placar-x");
  _iconeX.style.color = COR_INICIAL_X;

  const definirNomeX = (nome) => (_nomeX.innerText = nome);
  const definirPontosX = (pontos) => (_pontosX.innerText = pontos);
  const definirCorX = (cor) => (_iconeX.style.color = cor);

  // nodes referentes ao placar do jogador com O
  const _nomeO = document.getElementById("nome-o");
  const _pontosO = document.getElementById("pontos-o");
  const _iconeO = document.getElementById("icone-placar-o");
  _iconeO.style.color = COR_INICIAL_O;

  const definirNomeO = (nome) => (_nomeO.innerText = nome);
  const definirPontosO = (pontos) => (_pontosO.innerText = pontos);
  const definirCorO = (cor) => (_iconeO.style.color = cor);

  return {
    definirNomeX,
    definirPontosX,
    definirCorX,
    definirNomeO,
    definirPontosO,
    definirCorO,
  };
})();

// elementos html do tabuleiro
const tabuleiroHtml = (() => {
  // botoes do tabuleiro
  let _vezDoX = true;
  const _celulas = document.getElementsByClassName("tab");

  for (let i = 0; i < _celulas.length; i++) {
    _celulas[i].addEventListener("click", (e) =>
      _clicarCelula(e.currentTarget)
    );
  }

  const _desabilitarCelulas = () => {
    for (let i = 0; i < _celulas.length; i++) {
      _celulas[i].disabled = true;
    }
  };

  const _clicarCelula = (botao) => {
    if (!botao.classList.contains("usado")) {
      const icone = document.createElement("i");
      const linhaJogada = parseInt(botao.id.split("-")[1]);
      const colunaJogada = parseInt(botao.id.split("-")[2]);

      if (_vezDoX) {
        icone.classList.add("fas", "fa-times");
        icone.style.color = JOGADOR_X.verCor();

        botao.appendChild(icone);
        botao.classList.add("usado");

        const ganhou = tabuleiro.jogar(linhaJogada, colunaJogada, "X");
        if (ganhou != -1) {
          console.log("X GANHOU");

          _desabilitarCelulas();
          JOGADOR_X.novaVitoria();
          placarHtml.definirPontosX(JOGADOR_X.verVitorias());
        }
      } else {
        icone.classList.add("far", "fa-circle");
        icone.style.color = JOGADOR_O.verCor();

        botao.appendChild(icone);
        botao.classList.add("usado");

        const ganhou = tabuleiro.jogar(linhaJogada, colunaJogada, "O");
        if (ganhou != -1) {
          console.log("O GANHOU");

          _desabilitarCelulas();
          JOGADOR_O.novaVitoria();
          placarHtml.definirPontosO(JOGADOR_O.verVitorias());
        }
      }
      _vezDoX = !_vezDoX;
    }
  };

  const limpar = () => {
    for (let i = 0; i < _celulas.length; i++) {
      _celulas[i].innerText = "";
      _celulas[i].classList.remove("usado");
      _celulas[i].disabled = false;
    }

    tabuleiro.limpar();
  };

  return { limpar };
})();

(() => {
  const _btnReiniciar = document.getElementById("btn-reiniciar");
  _btnReiniciar.addEventListener("click", tabuleiroHtml.limpar);

  const _btnZerar = document.getElementById("btn-zerar");
  _btnZerar.addEventListener("click", () => {
    JOGADOR_X.zerarVitorias();
    JOGADOR_O.zerarVitorias();

    placarHtml.definirPontosX(JOGADOR_X.verVitorias());
    placarHtml.definirPontosO(JOGADOR_O.verVitorias());

    tabuleiroHtml.limpar();
  });
})();

const JOGADOR_X = Jogador("Jogador 1", "X", COR_INICIAL_X);
const JOGADOR_O = Jogador("Jogador 2", "O", COR_INICIAL_O);

placarHtml.definirNomeX(JOGADOR_X.verNome());
placarHtml.definirCorX(JOGADOR_X.verCor());
placarHtml.definirPontosX(JOGADOR_X.verVitorias());

placarHtml.definirNomeO(JOGADOR_O.verNome());
placarHtml.definirCorO(JOGADOR_O.verCor());
placarHtml.definirPontosO(JOGADOR_O.verVitorias());
