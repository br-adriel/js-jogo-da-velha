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
    } else if (_tabuleiro[1][0] !== "") {
      if (
        _tabuleiro[1][1] === _tabuleiro[1][0] &&
        _tabuleiro[1][2] === _tabuleiro[1][0]
      ) {
        return _tabuleiro[1][0];
      }
    } else if (_tabuleiro[2][0] !== "") {
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
    } else if (_tabuleiro[0][1] !== "") {
      if (
        _tabuleiro[1][1] === _tabuleiro[0][1] &&
        _tabuleiro[2][1] === _tabuleiro[0][1]
      ) {
        return _tabuleiro[0][1];
      }
    } else if (_tabuleiro[0][2] !== "") {
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
    } else if (_tabuleiro[0][2] !== "") {
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
    _tabuleiro.forEach((linha) => {
      linha.forEach((coluna) => {
        coluna = "";
      });
    });
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
  };
  const verCor = () => _cor;
  const novaVitoria = () => {
    _vitorias++;
  };
  const verVitorias = () => _vitorias;

  return {
    alterarNome,
    verNome,
    verSimbolo,
    alterarCor,
    verCor,
    novaVitoria,
    verVitorias,
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
