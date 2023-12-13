"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DadosPostagem = exports.mostrarPerfil = exports.DadosPerfil = exports.MostrarPostagens = exports.obter_numero = void 0;
const readline_sync_1 = require("readline-sync");
const Perfil_1 = require("../modelos/Perfil");
const Postagem_1 = require("../modelos/Postagem");
const PostagemAvancada_1 = require("../modelos/PostagemAvancada");
const RepositorioDePerfis_1 = require("../repositorios/RepositorioDePerfis");
function obter_numero(label = `Digite um numero: `) {
    const numero = Number((0, readline_sync_1.question)(label));
    if (isNaN(numero)) {
        console.log('Entrada inválida. Por favor, insira um número válido.');
        obter_numero();
    }
    else {
        console.log(`Número inserido: ${numero}`);
        return numero;
    }
    return numero;
}
exports.obter_numero = obter_numero;
function MostrarPostagens(postagens) {
    if (postagens == null) {
        console.log("Nenhuma postagem encontrada!\n");
    }
    else {
        for (let post of postagens) {
            console.log(`\n ID: ${post.id}`);
            console.log(`Texto: ${post.texto} `);
            console.log(`Curtidas: ${post.curtidas} `);
            console.log(`Descurtidas: ${post.descurtidas} `);
            console.log(`Data: ${post.data.toISOString()} `);
            console.log(`Perfil: ${post.perfil.id} \n`);
            if (post instanceof PostagemAvancada_1.PostagemAvancada) {
                console.log(`Hashtags: ${post.hashtag}`);
                console.log(`Visualizações: ${post.visualizacoesRestantes}`);
            }
        }
    }
}
exports.MostrarPostagens = MostrarPostagens;
function DadosPerfil() {
    const id = parseInt((0, readline_sync_1.question)("Digite o ID: "));
    const nome = (0, readline_sync_1.question)("Digite o nome: ");
    const email = (0, readline_sync_1.question)("Digite o email: ");
    const novoPerfil = new Perfil_1.Perfil(id, nome, email);
    return novoPerfil;
}
exports.DadosPerfil = DadosPerfil;
function mostrarPerfil(perfil) {
    if (perfil !== null) {
        console.log(`>>Dados do Perfil:`);
        console.log(`\nId: ${perfil.id}`);
        console.log(`Nome ${perfil.nome}`);
        console.log(`e-mail: ${perfil.email} `);
        console.log(`Seguindo: ${perfil.seguindo.length}`);
        console.log(`Seguidores: ${perfil.seguidores.length}\n`);
    }
}
exports.mostrarPerfil = mostrarPerfil;
function DadosPostagem() {
    const id = parseInt((0, readline_sync_1.question)("Digite o ID postagem: "));
    const texto = (0, readline_sync_1.question)("Digite texto: ");
    const curtidas = parseInt((0, readline_sync_1.question)("Digite o numero de curtidas: "));
    const descurtidas = parseInt((0, readline_sync_1.question)("Digite o numero de descurtidas: "));
    const data = new Date();
    const idPerfil = parseInt((0, readline_sync_1.question)("Digite ID do perfil: "));
    const repositorioDePerfis = new RepositorioDePerfis_1.RepositorioDePerfis();
    const perfil = repositorioDePerfis.consultar(idPerfil);
    if (perfil != null) {
        const avancadaOuN = parseInt((0, readline_sync_1.question)("Deseja adicionar hashtags e visualizações? 1- SIM 2-NÃO"));
        if (avancadaOuN == 1) {
            const hashtag = [(0, readline_sync_1.question)("Digite a hashtag: ")]; // Correção realizada aqui, agora hashtag é um array de string
            const visualizacoes = parseInt((0, readline_sync_1.question)("Digite o numero de visualizações: "));
            const novaPostagemAvancada = new PostagemAvancada_1.PostagemAvancada(id, texto, curtidas, descurtidas, data, perfil, hashtag, visualizacoes);
            return novaPostagemAvancada;
        }
        else {
            const novaPostagem = new Postagem_1.Postagem(id, texto, curtidas, descurtidas, data, perfil);
            return novaPostagem;
        }
    }
    else {
        console.log(`Erro\n`);
        throw new Error(`Perfil não associado!\n`);
    }
}
exports.DadosPostagem = DadosPostagem;
