"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePerfis = exports.ExcluirPerfil = exports.PerfilExistente = exports.ConsultarPerfilError = void 0;
class ConsultarPerfilError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConsultarPerfilError';
    }
}
exports.ConsultarPerfilError = ConsultarPerfilError;
class PerfilExistente extends Error {
    constructor(message) {
        super(message);
        this.name = 'PerfilExistente';
    }
}
exports.PerfilExistente = PerfilExistente;
class ExcluirPerfil extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExcluirPerfil';
    }
}
exports.ExcluirPerfil = ExcluirPerfil;
class RepositorioDePerfis {
    constructor() {
        this._perfis = [];
    }
    // Tratamento de erro para o método incluir
    incluir(perfil) {
        try {
            // Verifica se o perfil já existe
            const perfilExistente = this.consultar(undefined, perfil.nome, perfil.email);
            if (!perfilExistente) {
                this._perfis.push(perfil);
                return;
            }
            // Se não existir, incluir no perfil
        }
        catch (erro) {
            throw new PerfilExistente('Perfil já existe!');
        }
    }
    consultar(id, nome, email) {
        // Captura exceções ao consultar o perfil e registra um erro no console
        try {
            if (isNaN(id)) { // retorna o perfil sem ser passado o parametro id
                for (let item of this._perfis) {
                    if ((nome === undefined || nome === item.nome || nome === '') &&
                        (email === undefined || email === item.email || email === '')) {
                        return item;
                    }
                }
            }
            else { //retorna o perfil para a demais situações
                for (let item of this._perfis) {
                    if ((id === undefined || id === item.id) &&
                        (nome === undefined || nome === item.nome || nome === '') &&
                        (email === undefined || email === item.email || email === '')) {
                        return item;
                    }
                }
            }
            return null;
        }
        catch (erro) {
            throw new ConsultarPerfilError('Erro ao consultar perfil.');
        }
    }
    obterPerfis() {
        return this._perfis;
    }
    excluirPerfil(id) {
        try {
            let perfil = this.consultar(id);
            if (perfil !== null) {
                let index = this._perfis.indexOf(perfil);
                if (index !== -1) {
                    this._perfis.splice(index, 1); // Remove o perfil na posição 'index'
                    console.log(`Perfil com ID ${id} excluído com sucesso.`);
                }
                else {
                    console.log(`Perfil com ID ${id} não encontrado no array.`);
                }
            }
            else {
                console.log(`Perfil com ID ${id} não encontrado.`);
            }
        }
        catch (error) {
            //console.error(`Erro ao excluir perfil: ${error.message}`);
            // Aqui você pode decidir se deseja relançar a exceção ou fazer algo mais, dependendo da sua lógica de tratamento de erros.
            throw new ExcluirPerfil('Erro ao excluir perfil!');
        }
    }
}
exports.RepositorioDePerfis = RepositorioDePerfis;
