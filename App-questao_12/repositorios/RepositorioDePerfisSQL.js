"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePerfisSQL = void 0;
class RepositorioDePerfisSQL {
    // Implementação dos métodos usando SQL
    incluir(perfil) {
        try {
            // Lógica para incluir no banco de dados
        }
        catch (error) {
            console.error(`Erro ao incluir perfil no banco de dados: ${error.message}`);
            throw error; // rethrow para propagar o erro
        }
    }
    consultar(id, nome, email) {
        // Código para consultar um perfil no banco de dados
        return null; // Substitua pelo código correto
    }
    obterPerfis() {
    }
    excluirPerfil(id) {
    }
}
exports.RepositorioDePerfisSQL = RepositorioDePerfisSQL;
