// module de tabuleiro
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
