"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePostagens = exports.ErroConsultaPostagem = exports.ErroInserirPostagem = void 0;
const PostagemAvancada_1 = require("../modelos/PostagemAvancada");
class ErroInserirPostagem extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErroInserirPostagem';
    }
}
exports.ErroInserirPostagem = ErroInserirPostagem;
class ErroConsultaPostagem extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErroConsultaPostagem';
    }
}
exports.ErroConsultaPostagem = ErroConsultaPostagem;
class RepositorioDePostagens {
    constructor() {
        this.Postagens = [];
    }
    incluirPostagem(postagem) {
        try {
            // Verificar se a postagem já existe usando o método consultar
            const postagensEncontradas = this.consultar(postagem.id, postagem.texto, undefined, postagem.perfil.id);
            if (postagensEncontradas == null) {
                this.Postagens.push(postagem);
                //console.log("Postagem já existe!\n");
                return;
            }
            // Se não existir, incluir a postagem
        }
        catch (error) {
            throw new ErroInserirPostagem('Postagem não inserida!');
        }
    }
    consultar(id, texto, hashtag, perfil) {
        try {
            let postagensEncontradas = [];
            for (let item of this.Postagens) {
                if ((id === undefined || item.id === id) &&
                    (texto === undefined || item.texto === texto) &&
                    (item instanceof PostagemAvancada_1.PostagemAvancada
                        ? hashtag === undefined || item.existeHashtag(hashtag)
                        : true) && // Verifica se é uma instância de PostagemAvancada
                    (perfil === undefined || item.perfil.id === perfil)) {
                    postagensEncontradas.push(item);
                }
            }
            if (postagensEncontradas.length !== 0) {
                return postagensEncontradas;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new ErroConsultaPostagem('Postagem não encontrada!');
        }
    }
    listarTodasAsPostagens() {
        try {
            const todasPostagens = [];
            for (let item of this.Postagens) {
                todasPostagens.push(item);
            }
            return todasPostagens;
        }
        catch (erro) {
            throw new ErroConsultaPostagem('Não há postagens!');
        }
    }
    excluirPostagem(id) {
        try {
            let postagem = this.consultar(id);
            if (postagem != null) {
                for (let item of postagem) {
                    let index = this.Postagens.indexOf(item);
                    if (index !== -1) {
                        this.Postagens.splice(index, 1); // Remove o perfil na posição 'index'
                        console.log(`Postagem com ID ${id} excluído com sucesso.`);
                    }
                }
            }
        }
        catch (erro) {
            throw new ErroConsultaPostagem('Postagem não encontrada!');
        }
    }
}
exports.RepositorioDePostagens = RepositorioDePostagens;
