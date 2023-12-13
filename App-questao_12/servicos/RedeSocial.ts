
//import { IRepositorioPostagens,} from '../Interfaces/IRepositorioPostagens';
//import { IRepositorioPerfis } from '../interfaces/IRepositorioPerfis';
import { RepositorioDePerfis, ConsultarPerfilError, PerfilExistente, ExcluirPerfil } from '../repositorios/RepositorioDePerfis';
import { ErroConsultaPostagem, ErroInserirPostagem, RepositorioDePostagens } from '../repositorios/RepositorioDePostagens';
import { Perfil } from "../modelos/Perfil";
import { Postagem } from "../modelos/Postagem";
import { PostagemAvancada } from "../modelos/PostagemAvancada";

import * as fs from 'fs';

export class ErroPostagensPopulares extends Error{
    constructor(message: string) {
        super(message);
        this.name = 'ErroPostagensPopulares';
    }
}

export class ErroSalvamento extends Error{
    constructor(message: string) {
        super(message);
        this.name = 'ErroSalvamento';
    }
}

export class ErroCarregamento extends Error{
    constructor(message: string) {
        super(message);
        this.name = 'ErroCarregamento';
    }
}


export class RedeSocial {

    private ArquivoPerfil: string = "../data/ListaPerfil.csv";
    private ArquivoPostagem: string = "../data/ListaPostagens.csv";
    private ArquivoPostagemAvancada: string = "../data/ListaPostagenAvancada.csv";



    constructor(
        private _RepositorioDePerfis: RepositorioDePerfis,
        private _RepositorioDePostagens: RepositorioDePostagens
    ) { }
    //i
    incluirPerfil(perfil: Perfil): void {
        try {
            // Verifica se o perfil já existe
            const perfilExistente = this._RepositorioDePerfis.consultar(undefined, perfil.nome, perfil.email);
    
            if (!perfilExistente) {
                this._RepositorioDePerfis.incluir(perfil);
                
                
            } else {
                throw new PerfilExistente('Perfil já existente!');
            }
        } catch (erro: any) {
            throw new PerfilExistente('Erro ao incluir perfil: ' + erro.message);
        }
    }
    //ii
    consultarPerfil(id?: number, nome?: string, email?: string): Perfil | null {
        const perfil = this._RepositorioDePerfis.consultar(id, nome, email);
        
        if (!perfil) {
            throw new ConsultarPerfilError('Perfil não encontrado.');
        }
    
        return perfil;
    }
    //iii
    incluirPostagem(postagem: Postagem): void {
        try{
         this._RepositorioDePostagens.incluirPostagem(postagem)
        }catch(erro: any){
            throw new ErroInserirPostagem('Erro ao inserir:' + erro.message)
        }
    }
    //iv–ok
    consultarPostagens(id?: number, texto?: string, hashtag?: string, perfil?: number): Postagem[] | null {
        try{
         return this._RepositorioDePostagens.consultar(id, texto, hashtag, perfil)
        }catch(erro: any){
            throw new ErroConsultaPostagem('Erro ao consultar postagem:' + erro.message)
        }
    }
    //v----------- ok-----------------------------
    curtir(idPostagem: number): void {
        try{
        const postagem = this._RepositorioDePostagens.consultar(idPostagem);
        if (postagem) {
            for (let item of postagem) {
                item.curtir();
                console.log(`Você curtiu a postagem com ID ${idPostagem}\n`);
            }
        }
        }catch(erro){
            throw new ErroConsultaPostagem('Postagem não encontrada!')
        }
    }

    //vi-ok
    descurtir(idPostagem: number): void {
        try{
        const postagem = this._RepositorioDePostagens.consultar(idPostagem);

        if (postagem) {
            for (let item of postagem) {
                item.descurtir();
                console.log(`Você descurtiu a postagem com ID ${idPostagem}\n`);
            }
        } 
        }catch(erro){
            throw new ErroConsultaPostagem('Postagem não econtrada!')
        }
    }

    //vii
    decrementarVisualizacoes(idPostagem: number): void {
        try{
        const postagens = this._RepositorioDePostagens.consultar(idPostagem);

        if (postagens) {
            for (let item of postagens) {
                if (item instanceof PostagemAvancada) {
                    item.decrementarVisualizacoes();
                    console.log('Vizualização decrementada!\n');
                }
            }
        } 
        }catch(erro){
            throw new ErroConsultaPostagem('Postagem não encontrada!')
        }
    }

    exibirPostagensPorPerfil(id: number): Postagem[] | null {
        // ok -funcionando
        const postagens = this._RepositorioDePostagens.consultar(undefined, undefined, undefined, id);

        if (postagens) {

            const postagensFiltradas: Postagem[] = [];

            
            for (let item of postagens) {
                if (item instanceof PostagemAvancada) {
                    item.decrementarVisualizacoes();
                    postagensFiltradas.push(item);
                }
            }

            const filtroPostagens = postagensFiltradas.filter((item) => {
                if (item instanceof PostagemAvancada) {
                    return item.visualizacoesRestantes > 0;
                }
                return true;
            });

            return filtroPostagens.length > 0 ? filtroPostagens : null;
        } else {
            return null;
        }
    }

    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] | null {
        const postagens = this._RepositorioDePostagens.consultar(undefined, undefined, hashtag);

        if (postagens != null) {
            for (let item of postagens) {
                if (item instanceof PostagemAvancada) {
                    item.decrementarVisualizacoes();
                }
            }
        }

        const filtroPostagens: PostagemAvancada[] = [];
        if (postagens != null) {
            for (let item of postagens) {
                if (item instanceof PostagemAvancada && item.visualizacoesRestantes > 0) {
                    filtroPostagens.push(item);
                }
            }
            return filtroPostagens;
        } else {

            return null;
        }

    }

    carregarDeArquivo() {
        try{
        let contadorDadosLidos = 0;

        const dadosPerfis: string = fs.readFileSync(this.ArquivoPerfil, 'utf-8');
        const dadosPostagens: string = fs.readFileSync(this.ArquivoPostagem, 'utf-8');
        const dadosPostagensAvancadas: string = fs.readFileSync(this.ArquivoPostagemAvancada, 'utf-8');

        const linhasPerfis: string[] = dadosPerfis.split('\n');
        const linhasPostagens: string[] = dadosPostagens.split('\n');
        const linhasPostagensAvancadas: string[] = dadosPostagensAvancadas.split('\n');
        
        contadorDadosLidos += linhasPerfis.length + linhasPostagens.length + linhasPostagensAvancadas.length;
        
        for (let linha of linhasPerfis) {
            const perfilData: string[] = linha.split(';');
            if (perfilData.length > 0) {
                const id = parseInt(perfilData[0]);
                const nome = perfilData[1];
                const email = perfilData[2];
                const perfil = new Perfil(id, nome, email);
                this._RepositorioDePerfis.incluir(perfil);
            }
        }

        for (let linha of linhasPostagens) {
            const DadosPostagens: string[] = linha.split(';');
            if (DadosPostagens.length > 0) {
                const id = parseInt(DadosPostagens[0]);
                const texto = DadosPostagens[1];
                const curtidas = parseInt(DadosPostagens[2]);
                const descurtidas = parseInt(DadosPostagens[3]);
                const data = new Date(DadosPostagens[4]);
                const perfilId = parseInt(DadosPostagens[5]);

                const perfil = this._RepositorioDePerfis.consultar(perfilId);

                if (perfil) {
                    const postagem = new Postagem(id, texto, curtidas, descurtidas, data, perfil);
                    this._RepositorioDePostagens.incluirPostagem(postagem);
                } else {
                    console.log(`Perfil inexistente para a postagem com ID ${id}!`);
                }
            }
        }
        for (let linha of linhasPostagensAvancadas) {
            const DadosPostagenAvancada: string[] = linha.split(';');
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

                    const postagemAvancada = new PostagemAvancada(id, texto, curtidas, descurtidas, data, perfil, hashtags, visualizacoesRestantes);
                    this.incluirPostagem(postagemAvancada);
                } else {
                    console.log(`Perfil inexistente para a postagem com ID ${id}!`);
                }
            }
        } 
        console.log(`${contadorDadosLidos} dados foram lidos.`);
        }catch(erro){
            throw new ErroCarregamento('Erro ao carregar os dados!')
        }
    }

    salvarEmArquivo(): void {
        try {
            // Salvando os perfis em um arquivo
            const dadosPerfis = this._RepositorioDePerfis.obterPerfis().map(perfil => `${perfil.id};${perfil.nome};${perfil.email}`).join('\n');
            fs.writeFileSync(this.ArquivoPerfil, dadosPerfis, 'utf-8');

            const postagensSalvas: number[] = []
            // Salvando as postagens em um arquivo
            const dadosPostagens = this._RepositorioDePostagens.Postagens.filter(postagem => !postagensSalvas.includes(postagem.id)).map(postagem => {
                const perfilId = postagem.perfil.id;
                const dataString = postagem.data.toISOString();
                postagensSalvas.push(postagem.id);
                return `${postagem.id};${postagem.texto};${postagem.curtidas};${postagem.descurtidas};${dataString};${perfilId}`;
            }).join('\n');
           
            fs.writeFileSync(this.ArquivoPostagem, dadosPostagens, 'utf-8');
            console.log('Dados salvos com sucesso!');
        } catch (error) {
            throw new ErroSalvamento('Erro ao salvar arquivo!')
        }

        try{

            // Salvando as postagens avançadas em um arquivo
            const dadosPostagensAvancadas = this._RepositorioDePostagens.Postagens.filter(postagem => postagem instanceof PostagemAvancada).map(postagemAvancada => {
                const perfilId = postagemAvancada.perfil.id;
                const dataString = postagemAvancada.data.toISOString();
                const hashtags = (postagemAvancada as PostagemAvancada).hashtag.join(',');
                const visualizacoesRestantes = (postagemAvancada as PostagemAvancada).visualizacoesRestantes;
                return `${postagemAvancada.id};${postagemAvancada.texto};${postagemAvancada.curtidas};${postagemAvancada.descurtidas};${dataString};${perfilId};${hashtags};${visualizacoesRestantes}`;
            }).join('\n');

            fs.writeFileSync(this.ArquivoPostagemAvancada, dadosPostagensAvancadas, 'utf-8');
            console.log('Dados salvos com sucesso!');
        } catch (error) {
            throw new ErroSalvamento('Erro ao salvar arquivo!')
        }   
}
    

    //postagens populares:
    exibirPostagensPopulares(): Postagem[] {
        try{
        const todasPostagens = this._RepositorioDePostagens.listarTodasAsPostagens();
        const postagensPopulares: Postagem[] = []

        for (let item of todasPostagens) {
            if (item.ehPopular()) {
                postagensPopulares.push(item)
            }
        }

        return postagensPopulares;
        }catch(erro){
            throw new ErroPostagensPopulares('Não há postagens populares!')
        }
    }

    //FEED
    exibirTodasAsPostagens(): Postagem[] | null {
        try{
        return this._RepositorioDePostagens.listarTodasAsPostagens();
        }catch(erro){
            throw new ErroConsultaPostagem('Não há postagens!')
        }
    }

    excluirPerfil(id: number) {
        try {
            this._RepositorioDePerfis.excluirPerfil(id);
        } catch (error) {
            throw new ExcluirPerfil('Erro ao excluir perfil!');
        }
    }

    //excluir postagem
    excluirPostagem(id: number) {
        return this._RepositorioDePostagens.excluirPostagem(id);
    }

    //seguir perfil
    seguirPerfil(idPerfilSeguidor: number, idPerfilSeguido: number): void {
        try{
        const perfilSeguidor = this._RepositorioDePerfis.consultar(idPerfilSeguidor);
        const perfilSeguido = this._RepositorioDePerfis.consultar(idPerfilSeguido);

        if (perfilSeguidor && perfilSeguido) {
            if (perfilSeguidor.seguindo.includes(idPerfilSeguido)) {
                console.log(`Você já está seguindo o perfil com ID ${idPerfilSeguido}.`);
            } else {
                perfilSeguidor.seguindo.push(idPerfilSeguido);

                perfilSeguido.seguidores.push(idPerfilSeguidor);


                console.log(`Você seguiu o perfil com ID ${idPerfilSeguido}.`);
            }
        } 
        }catch(erro){
            throw new ConsultarPerfilError('Perfis não encontrados!')
        }
    }

}