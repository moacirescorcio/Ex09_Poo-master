"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postagem = void 0;
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
        this._curtidas++;
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
