"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postagem = exports.ErroCurti = void 0;
class ErroCurti extends Error {
    constructor(message) {
        super(message);
        this.name = 'Errocurtir';
    }
}
exports.ErroCurti = ErroCurti;
class Postagem {
    constructor(id, texto, curtidas, descurtidas, data, perfil) {
        this._id = id;
        this._texto = texto;
        this._curtidas = curtidas;
        this._descurtidas = descurtidas;
        this._data = new Date();
        this._perfil = perfil;
    }
    get id() {
        return this._id;
    }
    get texto() {
        return this._texto;
    }
    get curtidas() {
        return this._curtidas;
    }
    get descurtidas() {
        return this._descurtidas;
    }
    get data() {
        return this._data;
    }
    get perfil() {
        return this._perfil;
    }
    curtir() {
        try {
            this._curtidas++;
        }
        catch (erro) {
            throw new ErroCurti('Erro ao curtir');
        }
    }
    descurtir() {
        this._descurtidas++;
    }
    ehPopular() {
        if (this.curtidas > 1.5 * this.descurtidas) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Postagem = Postagem;
