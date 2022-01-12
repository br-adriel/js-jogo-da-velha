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
  const _btnEditarX = document.getElementById("editar-x");
  const _iconeX = document.getElementById("icone-placar-x");
  _iconeX.style.color = COR_INICIAL_X;

  _btnEditarX.addEventListener("click", () => {
    modalForm.exibir(JOGADOR_X);
  });
  const definirNomeX = (nome) => (_nomeX.innerText = nome);
  const definirPontosX = (pontos) => (_pontosX.innerText = pontos);
  const definirCorX = (cor) => (_iconeX.style.color = cor);

  // nodes referentes ao placar do jogador com O
  const _nomeO = document.getElementById("nome-o");
  const _pontosO = document.getElementById("pontos-o");
  const _btnEditarO = document.getElementById("editar-o");
  const _iconeO = document.getElementById("icone-placar-o");
  _iconeO.style.color = COR_INICIAL_O;

  _btnEditarO.addEventListener("click", () => {
    modalForm.exibir(JOGADOR_O);
  });
  const definirNomeO = (nome) => (_nomeO.innerText = nome);
  const definirPontosO = (pontos) => (_pontosO.innerText = pontos);
  const definirCorO = (cor) => (_iconeO.style.color = cor);

  const desabilitarEditar = () => {
    _btnEditarX.disabled = true;
    _btnEditarO.disabled = true;
  };

  const habilitarEditar = () => {
    _btnEditarX.disabled = false;
    _btnEditarO.disabled = false;
  };

  return {
    definirNomeX,
    definirPontosX,
    definirCorX,
    definirNomeO,
    definirPontosO,
    definirCorO,
    desabilitarEditar,
    habilitarEditar,
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

  const _declararVitoria = (vencedor) => {
    _desabilitarCelulas();
    placarHtml.habilitarEditar();
    vencedor.novaVitoria();

    if (vencedor.verSimbolo() === "X") {
      placarHtml.definirPontosX(vencedor.verVitorias());
    } else {
      placarHtml.definirPontosO(vencedor.verVitorias());
    }

    modalVencedor.definirNomeVencedor(vencedor.verNome());
    modalVencedor.mostrar();
  };

  const _clicarCelula = (botao) => {
    if (!botao.classList.contains("usado")) {
      const icone = document.createElement("i");
      const linhaJogada = parseInt(botao.id.split("-")[1]);
      const colunaJogada = parseInt(botao.id.split("-")[2]);
      placarHtml.desabilitarEditar();

      if (_vezDoX) {
        icone.classList.add("fas", "fa-times");
        icone.style.color = JOGADOR_X.verCor();

        botao.appendChild(icone);
        botao.classList.add("usado");

        const ganhou = tabuleiro.jogar(linhaJogada, colunaJogada, "X");
        if (ganhou != -1) {
          _declararVitoria(JOGADOR_X);
        }
      } else {
        icone.classList.add("far", "fa-circle");
        icone.style.color = JOGADOR_O.verCor();

        botao.appendChild(icone);
        botao.classList.add("usado");

        const ganhou = tabuleiro.jogar(linhaJogada, colunaJogada, "O");
        if (ganhou != -1) {
          _declararVitoria(JOGADOR_O);
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
      placarHtml.habilitarEditar();
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

const modalVencedor = (() => {
  const _fundoModal = document.getElementById("fundo-modal");
  const _btnContinuar = document.getElementById("btn-continuar");
  const _nomeVencedor = document.getElementById("nome-vencedor");

  _btnContinuar.addEventListener("click", () => {
    _fundoModal.style.display = "none";
    tabuleiroHtml.limpar();
    _nomeVencedor.innerText = "";
  });

  const mostrar = () => (_fundoModal.style.display = "flex");
  const definirNomeVencedor = (nome) => (_nomeVencedor.innerText = nome);
  return { mostrar, definirNomeVencedor };
})();

const modalForm = (() => {
  let _jogador;
  const _fundoModal = document.getElementById("modal-editar");
  const _formNome = document.getElementById("form-editar-nome");
  const _formCor = document.getElementById("form-editar-cor");
  const _inputNome = document.getElementById("input-nome");
  const _inputCor = document.getElementById("input-cor");
  const _btnFecharModal = document.getElementById("fechar-modal-editar");

  _btnFecharModal.addEventListener("click", () => {
    _fundoModal.style.display = "none";
    _inputNome.value = "";
    _inputCor.value = "#000000";
  });
  _formNome.addEventListener("submit", (e) => {
    e.preventDefault();

    _jogador.alterarNome(_inputNome.value);
    if (_jogador.verSimbolo() === "X") {
      placarHtml.definirNomeX(_inputNome.value);
    } else {
      placarHtml.definirNomeO(_inputNome.value);
    }
  });

  _formCor.addEventListener("submit", (e) => {
    e.preventDefault();

    _jogador.alterarCor(_inputCor.value);
    if (_jogador.verSimbolo() === "X") {
      placarHtml.definirCorX(_inputCor.value);
    } else {
      placarHtml.definirCorO(_inputCor.value);
    }
  });

  const exibir = (jogador) => {
    _fundoModal.style.display = "flex";
    _jogador = jogador;

    _inputNome.value = jogador.verNome();
    _inputCor.value = jogador.verCor();
  };

  return { exibir };
})();

const JOGADOR_X = Jogador("Jogador 1", "X", COR_INICIAL_X);
const JOGADOR_O = Jogador("Jogador 2", "O", COR_INICIAL_O);

placarHtml.definirNomeX(JOGADOR_X.verNome());
placarHtml.definirCorX(JOGADOR_X.verCor());
placarHtml.definirPontosX(JOGADOR_X.verVitorias());

placarHtml.definirNomeO(JOGADOR_O.verNome());
placarHtml.definirCorO(JOGADOR_O.verCor());
placarHtml.definirPontosO(JOGADOR_O.verVitorias());
