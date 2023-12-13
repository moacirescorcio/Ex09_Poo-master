"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = exports.ErroCarregamento = exports.ErroSalvamento = exports.ErroPostagensPopulares = void 0;
//import { IRepositorioPostagens,} from '../Interfaces/IRepositorioPostagens';
//import { IRepositorioPerfis } from '../interfaces/IRepositorioPerfis';
const RepositorioDePerfis_1 = require("../repositorios/RepositorioDePerfis");
const RepositorioDePostagens_1 = require("../repositorios/RepositorioDePostagens");
const Perfil_1 = require("../modelos/Perfil");
const Postagem_1 = require("../modelos/Postagem");
const PostagemAvancada_1 = require("../modelos/PostagemAvancada");
const fs = __importStar(require("fs"));
class ErroPostagensPopulares extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErroPostagensPopulares';
    }
}
exports.ErroPostagensPopulares = ErroPostagensPopulares;
class ErroSalvamento extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErroSalvamento';
    }
}
exports.ErroSalvamento = ErroSalvamento;
class ErroCarregamento extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErroCarregamento';
    }
}
exports.ErroCarregamento = ErroCarregamento;
class RedeSocial {
    constructor(_RepositorioDePerfis, _RepositorioDePostagens) {
        this._RepositorioDePerfis = _RepositorioDePerfis;
        this._RepositorioDePostagens = _RepositorioDePostagens;
        this.ArquivoPerfil = "../data/ListaPerfil.csv";
        this.ArquivoPostagem = "../data/ListaPostagens.csv";
        this.ArquivoPostagemAvancada = "../data/ListaPostagenAvancada.csv";
    }
    //i
    incluirPerfil(perfil) {
        try {
            // Verifica se o perfil já existe
            const perfilExistente = this._RepositorioDePerfis.consultar(undefined, perfil.nome, perfil.email);
            if (!perfilExistente) {
                this._RepositorioDePerfis.incluir(perfil);
            }
            else {
                throw new RepositorioDePerfis_1.PerfilExistente('Perfil já existente!');
            }
        }
        catch (erro) {
            throw new RepositorioDePerfis_1.PerfilExistente('Erro ao incluir perfil: ' + erro.message);
        }
    }
    //ii
    consultarPerfil(id, nome, email) {
        const perfil = this._RepositorioDePerfis.consultar(id, nome, email);
        if (!perfil) {
            throw new RepositorioDePerfis_1.ConsultarPerfilError('Perfil não encontrado.');
        }
        return perfil;
    }
    //iii
    incluirPostagem(postagem) {
        try {
            this._RepositorioDePostagens.incluirPostagem(postagem);
        }
        catch (erro) {
            throw new RepositorioDePostagens_1.ErroInserirPostagem('Erro ao inserir:' + erro.message);
        }
    }
    //iv–ok
    consultarPostagens(id, texto, hashtag, perfil) {
        try {
            return this._RepositorioDePostagens.consultar(id, texto, hashtag, perfil);
        }
        catch (erro) {
            throw new RepositorioDePostagens_1.ErroConsultaPostagem('Erro ao consultar postagem:' + erro.message);
        }
    }
    //v----------- ok-----------------------------
    curtir(idPostagem) {
        try {
            const postagem = this._RepositorioDePostagens.consultar(idPostagem);
            if (postagem) {
                for (let item of postagem) {
                    item.curtir();
                    console.log(`Você curtiu a postagem com ID ${idPostagem}\n`);
                }
            }
        }
        catch (erro) {
            throw new Postagem_1.ErroCurti('Erro ao curtir: Postagem não encontrada!');
        }
    }
    //vi-ok
    descurtir(idPostagem) {
        try {
            const postagem = this._RepositorioDePostagens.consultar(idPostagem);
            if (postagem) {
                for (let item of postagem) {
                    item.descurtir();
                    console.log(`Você descurtiu a postagem com ID ${idPostagem}\n`);
                }
            }
        }
        catch (erro) {
            throw new RepositorioDePostagens_1.ErroConsultaPostagem('Postagem não econtrada!');
        }
    }
    //vii
    decrementarVisualizacoes(idPostagem) {
        try {
            const postagens = this._RepositorioDePostagens.consultar(idPostagem);
            if (postagens) {
                for (let item of postagens) {
                    if (item instanceof PostagemAvancada_1.PostagemAvancada) {
                        item.decrementarVisualizacoes();
                        console.log('Vizualização decrementada!\n');
                    }
                }
            }
        }
        catch (erro) {
            throw new RepositorioDePostagens_1.ErroConsultaPostagem('Postagem não encontrada!');
        }
    }
    exibirPostagensPorPerfil(id) {
        // ok -funcionando
        const postagens = this._RepositorioDePostagens.consultar(undefined, undefined, undefined, id);
        if (postagens) {
            const postagensFiltradas = [];
            for (let item of postagens) {
                if (item instanceof PostagemAvancada_1.PostagemAvancada) {
                    item.decrementarVisualizacoes();
                    postagensFiltradas.push(item);
                }
            }
            const filtroPostagens = postagensFiltradas.filter((item) => {
                if (item instanceof PostagemAvancada_1.PostagemAvancada) {
                    return item.visualizacoesRestantes > 0;
                }
                return true;
            });
            return filtroPostagens.length > 0 ? filtroPostagens : null;
        }
        else {
            return null;
        }
    }
    exibirPostagensPorHashtag(hashtag) {
        const postagens = this._RepositorioDePostagens.consultar(undefined, undefined, hashtag);
        if (postagens != null) {
            for (let item of postagens) {
                if (item instanceof PostagemAvancada_1.PostagemAvancada) {
                    item.decrementarVisualizacoes();
                }
            }
        }
        const filtroPostagens = [];
        if (postagens != null) {
            for (let item of postagens) {
                if (item instanceof PostagemAvancada_1.PostagemAvancada && item.visualizacoesRestantes > 0) {
                    filtroPostagens.push(item);
                }
            }
            return filtroPostagens;
        }
        else {
            return null;
        }
    }
    carregarDeArquivo() {
        try {
            let contadorDadosLidos = 0;
            const dadosPerfis = fs.readFileSync(this.ArquivoPerfil, 'utf-8');
            const dadosPostagens = fs.readFileSync(this.ArquivoPostagem, 'utf-8');
            const dadosPostagensAvancadas = fs.readFileSync(this.ArquivoPostagemAvancada, 'utf-8');
            const linhasPerfis = dadosPerfis.split('\n');
            const linhasPostagens = dadosPostagens.split('\n');
            const linhasPostagensAvancadas = dadosPostagensAvancadas.split('\n');
            contadorDadosLidos += linhasPerfis.length + linhasPostagens.length + linhasPostagensAvancadas.length;
            for (let linha of linhasPerfis) {
                const perfilData = linha.split(';');
                if (perfilData.length > 0) {
                    const id = parseInt(perfilData[0]);
                    const nome = perfilData[1];
                    const email = perfilData[2];
                    const perfil = new Perfil_1.Perfil(id, nome, email);
                    this._RepositorioDePerfis.incluir(perfil);
                }
            }
            for (let linha of linhasPostagens) {
                const DadosPostagens = linha.split(';');
                if (DadosPostagens.length > 0) {
                    const id = parseInt(DadosPostagens[0]);
                    const texto = DadosPostagens[1];
                    const curtidas = parseInt(DadosPostagens[2]);
                    const descurtidas = parseInt(DadosPostagens[3]);
                    const data = new Date(DadosPostagens[4]);
                    const perfilId = parseInt(DadosPostagens[5]);
                    const perfil = this._RepositorioDePerfis.consultar(perfilId);
                    if (perfil) {
                        const postagem = new Postagem_1.Postagem(id, texto, curtidas, descurtidas, data, perfil);
                        this._RepositorioDePostagens.incluirPostagem(postagem);
                    }
                    else {
                        console.log(`Perfil inexistente para a postagem com ID ${id}!`);
                    }
                }
            }
            for (let linha of linhasPostagensAvancadas) {
                const DadosPostagenAvancada = linha.split(';');
                if (DadosPostagenAvancada.length > 0) {
                    const id = parseInt(DadosPostagenAvancada[0]);
                    const texto = DadosPostagenAvancada[1];
                    const curtidas = parseInt(DadosPostagenAvancada[2]);
                    const descurtidas = parseInt(DadosPostagenAvancada[3]);
                    const data = new Date(DadosPostagenAvancada[4]);
                    const perfilId = parseInt(DadosPostagenAvancada[5]);
                    const perfil = this._RepositorioDePerfis.consultar(perfilId);
                    if (perfil) {
                        const hashtags = DadosPostagenAvancada[6].split(',');
                        const visualizacoesRestantes = parseInt(DadosPostagenAvancada[7]);
                        const postagemAvancada = new PostagemAvancada_1.PostagemAvancada(id, texto, curtidas, descurtidas, data, perfil, hashtags, visualizacoesRestantes);
                        this.incluirPostagem(postagemAvancada);
                    }
                    else {
                        console.log(`Perfil inexistente para a postagem com ID ${id}!`);
                    }
                }
            }
            console.log(`${contadorDadosLidos} dados foram lidos.`);
        }
        catch (erro) {
            throw new ErroCarregamento('Erro ao carregar os dados!');
        }
    }
    salvarEmArquivo() {
        try {
            // Salvando os perfis em um arquivo
            const dadosPerfis = this._RepositorioDePerfis.obterPerfis().map(perfil => `${perfil.id};${perfil.nome};${perfil.email}`).join('\n');
            fs.writeFileSync(this.ArquivoPerfil, dadosPerfis, 'utf-8');
            const postagensSalvas = [];
            // Salvando as postagens em um arquivo
            const dadosPostagens = this._RepositorioDePostagens.Postagens.filter(postagem => !postagensSalvas.includes(postagem.id)).map(postagem => {
                const perfilId = postagem.perfil.id;
                const dataString = postagem.data.toISOString();
                postagensSalvas.push(postagem.id);
                return `${postagem.id};${postagem.texto};${postagem.curtidas};${postagem.descurtidas};${dataString};${perfilId}`;
            }).join('\n');
            fs.writeFileSync(this.ArquivoPostagem, dadosPostagens, 'utf-8');
            console.log('Dados salvos com sucesso!');
        }
        catch (error) {
            throw new ErroSalvamento('Erro ao salvar arquivo!');
        }
        try {
            // Salvando as postagens avançadas em um arquivo
            const dadosPostagensAvancadas = this._RepositorioDePostagens.Postagens.filter(postagem => postagem instanceof PostagemAvancada_1.PostagemAvancada).map(postagemAvancada => {
                const perfilId = postagemAvancada.perfil.id;
                const dataString = postagemAvancada.data.toISOString();
                const hashtags = postagemAvancada.hashtag.join(',');
                const visualizacoesRestantes = postagemAvancada.visualizacoesRestantes;
                return `${postagemAvancada.id};${postagemAvancada.texto};${postagemAvancada.curtidas};${postagemAvancada.descurtidas};${dataString};${perfilId};${hashtags};${visualizacoesRestantes}`;
            }).join('\n');
            fs.writeFileSync(this.ArquivoPostagemAvancada, dadosPostagensAvancadas, 'utf-8');
            console.log('Dados salvos com sucesso!');
        }
        catch (error) {
            throw new ErroSalvamento('Erro ao salvar arquivo!');
        }
    }
    //postagens populares:
    exibirPostagensPopulares() {
        try {
            const todasPostagens = this._RepositorioDePostagens.listarTodasAsPostagens();
            const postagensPopulares = [];
            for (let item of todasPostagens) {
                if (item.ehPopular()) {
                    postagensPopulares.push(item);
                }
            }
            return postagensPopulares;
        }
        catch (erro) {
            throw new ErroPostagensPopulares('Não há postagens populares!');
        }
    }
    //FEED
    exibirTodasAsPostagens() {
        try {
            return this._RepositorioDePostagens.listarTodasAsPostagens();
        }
        catch (erro) {
            throw new RepositorioDePostagens_1.ErroConsultaPostagem('Não há postagens!');
        }
    }
    excluirPerfil(id) {
        try {
            this._RepositorioDePerfis.excluirPerfil(id);
        }
        catch (error) {
            throw new RepositorioDePerfis_1.ExcluirPerfil('Erro ao excluir perfil!');
        }
    }
    //excluir postagem
    excluirPostagem(id) {
        return this._RepositorioDePostagens.excluirPostagem(id);
    }
    //seguir perfil
    seguirPerfil(idPerfilSeguidor, idPerfilSeguido) {
        try {
            const perfilSeguidor = this._RepositorioDePerfis.consultar(idPerfilSeguidor);
            const perfilSeguido = this._RepositorioDePerfis.consultar(idPerfilSeguido);
            if (perfilSeguidor && perfilSeguido) {
                if (perfilSeguidor.seguindo.includes(idPerfilSeguido)) {
                    console.log(`Você já está seguindo o perfil com ID ${idPerfilSeguido}.`);
                }
                else {
                    perfilSeguidor.seguindo.push(idPerfilSeguido);
                    perfilSeguido.seguidores.push(idPerfilSeguidor);
                    console.log(`Você seguiu o perfil com ID ${idPerfilSeguido}.`);
                }
            }
        }
        catch (erro) {
            throw new RepositorioDePerfis_1.ConsultarPerfilError('Perfis não encontrados!');
        }
    }
}
exports.RedeSocial = RedeSocial;
