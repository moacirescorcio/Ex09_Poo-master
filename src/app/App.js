"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RedeSocial_1 = require("../servicos/RedeSocial");
//import {IRepositorioPerfis } from '../Interfaces/IRepositorioPerfis';
//import { RepositorioDePostagensSQL } from '../repositorios/RepositorioDePostagensSQL';
const Utils_1 = require("../utils/Utils");
const readline_sync_1 = require("readline-sync");
const RepositorioDePerfis_1 = require("../repositorios/RepositorioDePerfis");
const RepositorioDePostagens_1 = require("../repositorios/RepositorioDePostagens");
class App {
    constructor(RedeSocial) {
        this._RedeSocial = RedeSocial;
    }
    Menu() {
        try {
            while (true) {
                const opcoes = [
                    '1-Carregar de Arquivo',
                    '2-Perfis',
                    '3-Postagens',
                    '4-Interações',
                    '5-Salvar Arquivo',
                    '6-Sair'
                ];
                console.log('\nBem-vindo ao sistema da Rede Social.');
                opcoes.forEach((opcao) => console.log(opcao));
                let opcaoPrincipal = (0, readline_sync_1.question)('Digite o número correspondente à opção principal: ');
                switch (opcaoPrincipal) {
                    case '1':
                        this.opcao1();
                        break;
                    case '2':
                        this.opcao2();
                        break;
                    case '3':
                        this.opcao3();
                        break;
                    case '4':
                        this.opcao4();
                        break;
                    case '5':
                        this.opcao5();
                        break;
                    case '6':
                        console.log('Obrigado por usar nossa Rede Social!');
                        return;
                    default:
                        console.log('Opção inválida. Tente novamente.');
                }
            }
        }
        catch (erro) {
            console.error('Erro no menu interativo:', erro);
        }
    }
    opcao1() {
        try {
            const carregarArquivos = parseInt((0, readline_sync_1.question)('Deseja carregar os dados de um arquivo? (1 - Sim, 0 - Não): '));
            if (carregarArquivos === 1) {
                this._RedeSocial.carregarDeArquivo();
                console.log('Dados do arquivo carregados com sucesso!');
            }
        }
        catch (erro) {
            if (erro instanceof RedeSocial_1.ErroCarregamento) {
                console.error(erro.message);
            }
            else {
                console.error(`\nErro ao carregar arquivo: ${erro.message}`);
                // lógica para tratamento de outros tipos de erros, se necessário
            }
        }
    }
    opcao2() {
        const opcoes = [
            '1-Criar Perfil',
            '2-Consultar Perfil',
            '3-Excluir um Perfil'
        ];
        console.log('\nOpções de perfis:');
        opcoes.forEach((opcao) => console.log(opcao));
        let opcaoSecundaria = (0, readline_sync_1.question)('Digite o número correspondente à opção de perfil: ');
        switch (opcaoSecundaria) {
            case '1':
                try {
                    console.log(`Crie um novo perfil!\n`);
                    const novoPerfil = (0, Utils_1.DadosPerfil)();
                    this._RedeSocial.incluirPerfil(novoPerfil);
                    console.log('Perfil incluído com sucesso!');
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePerfis_1.PerfilExistente) {
                        console.error(erro.message);
                        // lógica para tratamento específico desse tipo de erro na RedeSocial, se necessário
                    }
                    else {
                        console.error(`\nErro inesperado ao incluir perfil na RedeSocial: ${erro.message}`);
                        // lógica para tratamento de outros tipos de erros, se necessário
                    }
                }
                break;
            case '2':
                try {
                    console.log(`Consulte um perfil\n`);
                    const idconsulta = parseInt((0, readline_sync_1.question)('Digite o id do perfil: '));
                    const nomeconsulta = (0, readline_sync_1.question)('Digite o nome do perfil: ');
                    const emailconsulta = (0, readline_sync_1.question)('Digite o email do perfil: ');
                    const resultado = this._RedeSocial.consultarPerfil(idconsulta, nomeconsulta, emailconsulta);
                    (0, Utils_1.mostrarPerfil)(resultado);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePerfis_1.ConsultarPerfilError) {
                        console.error(`\nErro ao consultar perfil na RedeSocial: ${erro.message}`);
                        // lógica para tratamento específico desse tipo de erro na RedeSocial, se necessário
                    }
                    else {
                        console.error(`\nErro inesperado ao consultar perfil na RedeSocial: ${erro.message}`);
                        // lógica para tratamento de outros tipos de erros, se necessário
                    }
                }
                break;
            case '3':
                try {
                    console.log(`Excluir um Perfil\n`);
                    const id = parseInt((0, readline_sync_1.question)('Qual o ID do Perfil: '));
                    this._RedeSocial.excluirPerfil(id);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePerfis_1.ExcluirPerfil) {
                        console.error(erro.message);
                        // Lógica para tratamento específico desse tipo de erro na RedeSocial, se necessário
                    }
                    else {
                        console.error(`Erro inesperado ao excluir perfil na RedeSocial: ${erro.message}`);
                        // Lógica para tratamento de outros tipos de erros, se necessário
                    }
                }
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                this.Menu();
        }
    }
    opcao3() {
        const opcoes = [
            '1-Criar Postagem',
            '2-Consultar Postagem por Id',
            '3-Exibir Postagem por Perfil',
            '4-Exibir Postagens por Hashtag',
            '5-Postagens Populares',
            '6-Apagar Postagem',
            '7-Listar Todas as Postagens'
        ];
        console.log('\nOpções de postagens:');
        opcoes.forEach((opcao) => console.log(opcao));
        let opcaoSecundaria = (0, readline_sync_1.question)('Digite o número correspondente à opção de postagem: ');
        switch (opcaoSecundaria) {
            case '1':
                try {
                    console.log(`Criar Postagem\n`);
                    const novaPostagem = (0, Utils_1.DadosPostagem)();
                    this._RedeSocial.incluirPostagem(novaPostagem);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePostagens_1.ErroInserirPostagem) {
                        console.error(erro.message);
                    }
                    else {
                        console.error(`Erro ao incluir postagem na RedeSocial: ${erro.message}`);
                        // Lógica para tratamento de outros tipos de erros, se necessário
                    }
                }
                break;
            case '2':
                try {
                    console.log(`Consultar Postagem\n`);
                    const id = parseInt((0, readline_sync_1.question)('Digite o id da postagem: '));
                    const resultado = this._RedeSocial.consultarPostagens(id);
                    (0, Utils_1.MostrarPostagens)(resultado);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePostagens_1.ErroConsultaPostagem) {
                        console.error(erro.message);
                    }
                    else {
                        console.error(erro.message);
                    }
                }
                break;
            case '3':
                try {
                    console.log(`Exibir Postagem por Perfil\n`);
                    const idPerfil = parseInt((0, readline_sync_1.question)('Informe o Id do Perfil: '));
                    const PostagensPerfil = this._RedeSocial.exibirPostagensPorPerfil(idPerfil);
                    (0, Utils_1.MostrarPostagens)(PostagensPerfil);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePostagens_1.ErroConsultaPostagem) {
                        console.error(erro.message);
                    }
                    else {
                        console.error(erro.message);
                    }
                }
                break;
            case '4':
                try {
                    console.log(`Exibir Postagens por Hashtag\n`);
                    const hashtag = (0, readline_sync_1.question)('Informe a hashtag que deseja procurar: ');
                    const PostagemPorHashtag = this._RedeSocial.exibirPostagensPorHashtag(hashtag);
                    (0, Utils_1.MostrarPostagens)(PostagemPorHashtag);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePostagens_1.ErroConsultaPostagem) {
                        console.error(erro.message);
                    }
                    else {
                        console.error(erro.message);
                    }
                }
                break;
            case '5':
                try {
                    console.log(`Postagens Populares\n`);
                    const PostagensPopulares = this._RedeSocial.exibirPostagensPopulares();
                    (0, Utils_1.MostrarPostagens)(PostagensPopulares);
                }
                catch (erro) {
                    if (erro instanceof RedeSocial_1.ErroPostagensPopulares) {
                        console.error(erro.message);
                    }
                    else {
                        console.error(erro.message);
                    }
                }
                break;
            case '6':
                try {
                    console.log(`Apagar Postagem\n`);
                    const idPostagem = parseInt((0, readline_sync_1.question)('Informe o ID da Postagem que deseja apagar: '));
                    this._RedeSocial.excluirPostagem(idPostagem);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePostagens_1.ErroConsultaPostagem) {
                        console.error(erro.message);
                    }
                    else {
                        console.error(erro.message);
                    }
                }
                break;
            case '7':
                try {
                    console.log(`Listar Todas as Postagens\n`);
                    const todasPostagens = this._RedeSocial.exibirTodasAsPostagens();
                    (0, Utils_1.MostrarPostagens)(todasPostagens);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePostagens_1.ErroConsultaPostagem) {
                        console.error(erro.message);
                    }
                    else {
                        console.error(erro.message);
                    }
                }
                break;
        }
    }
    opcao4() {
        const opcoes = [
            '1-Curtir Postagem',
            '2-Descurtir Postagem',
            '3-Decrementar Visualização',
            '4-Seguir Perfil'
        ];
        console.log('\nOpções de interações:');
        opcoes.forEach((opcao) => console.log(opcao));
        let opcaoSecundaria = (0, readline_sync_1.question)('Digite o número correspondente à opção de interação: ');
        switch (opcaoSecundaria) {
            case '1':
                try {
                    console.log(`Curtir Postagem\n`);
                    const idPostCurtida = parseInt((0, readline_sync_1.question)('Informe o ID da Postagem que deseja curtir: '));
                    this._RedeSocial.curtir(idPostCurtida);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePostagens_1.ErroConsultaPostagem) {
                        console.error(`Não foi possível curtir a postagem: ${erro.message}`);
                    }
                    else {
                        console.error(erro.message);
                    }
                }
                break;
            case '2':
                try {
                    console.log(`Descurtir Postagem\n`);
                    const idPostDescurtida = parseInt((0, readline_sync_1.question)('Informe o ID da Postagem que deseja descurtir: '));
                    this._RedeSocial.descurtir(idPostDescurtida);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePostagens_1.ErroConsultaPostagem) {
                        console.error(`Não foi possível curtir a postagem: ${erro.message}`);
                    }
                    else {
                        console.error(erro.message);
                    }
                }
                break;
            case '3':
                try {
                    console.log(`Decrementar Visualização\n`);
                    const idPostDecrementar = parseInt((0, readline_sync_1.question)('Informe o ID da Postagem que deseja decrementar a visualização: '));
                    this._RedeSocial.decrementarVisualizacoes(idPostDecrementar);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePostagens_1.ErroConsultaPostagem) {
                        console.error(`Não foi possível decrementar visualizações na postagem: ${erro.message}`);
                    }
                    else {
                        console.error(erro.message);
                    }
                }
                break;
            case '4':
                try {
                    console.log(`Seguir Perfil\n`);
                    const idPerfilSeguidor = parseInt((0, readline_sync_1.question)('Digite o ID do perfil seguidor: '));
                    const idPerfilSeguido = parseInt((0, readline_sync_1.question)('Digite o ID do perfil que deseja seguir: '));
                    this._RedeSocial.seguirPerfil(idPerfilSeguidor, idPerfilSeguido);
                }
                catch (erro) {
                    if (erro instanceof RepositorioDePerfis_1.ConsultarPerfilError) {
                        console.error(`Não foi possível seguir: ${erro.message}`);
                    }
                    else {
                        console.error(erro.message);
                    }
                }
                break;
        }
    }
    opcao5() {
        const opcoes = [
            '1-Salvar em Arquivo',
            '2-Nao Salvar'
        ];
        console.log('\nOutras opções:');
        opcoes.forEach((opcao) => console.log(opcao));
        let opcaoSecundaria = (0, readline_sync_1.question)('Digite o número correspondente à outra opção: ');
        switch (opcaoSecundaria) {
            case '1':
                try {
                    this._RedeSocial.salvarEmArquivo();
                }
                catch (erro) {
                    if (erro instanceof RedeSocial_1.ErroSalvamento) {
                        console.error(erro.message);
                        // Lógica para tratamento específico desse tipo de erro na RedeSocial, se necessário
                    }
                    else {
                        console.error(`Erro inesperado ao excluir perfil na RedeSocial: ${erro.message}`);
                        // Lógica para tratamento de outros tipos de erros, se necessário
                    }
                }
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                this.Menu();
        }
    }
}
const repositorioDePostagens = new RepositorioDePostagens_1.RepositorioDePostagens();
const repositorioDePerfis = new RepositorioDePerfis_1.RepositorioDePerfis();
const redeSocial = new RedeSocial_1.RedeSocial(repositorioDePerfis, repositorioDePostagens);
const app = new App(redeSocial);
app.Menu();
