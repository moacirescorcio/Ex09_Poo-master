
import { IRepositorioPostagens } from "../Interfaces/IRepositorioPostagens";
import { Postagem } from "../modelos/Postagem";
import { PostagemAvancada } from "../modelos/PostagemAvancada";

export class ErroInserirPostagem extends Error{
    constructor(message: string) {
        super(message);
        this.name = 'ErroInserirPostagem';
    }
}

export class ErroConsultaPostagem extends Error{
    constructor(message: string) {
        super(message);
        this.name = 'ErroConsultaPostagem';
    }
}
export class RepositorioDePostagens implements IRepositorioPostagens {
    Postagens: Postagem[] = []; 

    incluirPostagem(postagem: Postagem): void {
        try {
            // Verificar se a postagem já existe usando o método consultar
            const postagensEncontradas = this.consultar(postagem.id, postagem.texto, undefined, postagem.perfil.id);
    
            if (postagensEncontradas == null) {
                this.Postagens.push(postagem);
                //console.log("Postagem já existe!\n");
                return;
            }
    
            // Se não existir, incluir a postagem
        } catch (error) {
           throw new ErroInserirPostagem('Postagem não inserida!')
        }
    }

    consultar(id?: number, texto?: string, hashtag?: string, perfil?: number): Postagem[] | null {
        try {
            let postagensEncontradas: Postagem[] = [];
    
            for (let item of this.Postagens) {
                if (
                    (id === undefined || item.id === id) &&
                    (texto === undefined || item.texto === texto) &&
                    (item instanceof PostagemAvancada
                        ? hashtag === undefined || item.existeHashtag(hashtag)
                        : true) && // Verifica se é uma instância de PostagemAvancada
                    (perfil === undefined || item.perfil.id === perfil)
                ) {
                    postagensEncontradas.push(item);
                }
            }
    
            if (postagensEncontradas.length !== 0) {
                return postagensEncontradas;
            }
        } catch (error) {
            throw new ErroConsultaPostagem('Postagem não encontrada!')
        }
    }

    listarTodasAsPostagens(): Postagem[] {
        try{
        const todasPostagens: Postagem[] = [];

        for (let item of this.Postagens) {
            todasPostagens.push(item);
        }

        return todasPostagens;
        }catch(erro){
            throw new ErroConsultaPostagem('Não há postagens!')
        }
    }

    excluirPostagem(id: number) {
        try{
        let postagem = this.consultar(id)

        if (postagem != null) {
            for (let item of postagem) {
                let index = this.Postagens.indexOf(item)
                if (index !== -1) {
                    this.Postagens.splice(index, 1); // Remove o perfil na posição 'index'
                    console.log(`Postagem com ID ${id} excluído com sucesso.`);
                }
            }

        } 
        }catch(erro){
            throw new ErroConsultaPostagem('Postagem não encontrada!')
        }
    }

}