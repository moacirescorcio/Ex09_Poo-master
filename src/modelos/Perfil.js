"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfil = void 0;
const Utils_1 = require("../utils/Utils");
class Perfil {
    constructor(id, nome, email) {
        if (this.validaId(id)) {
            this._id = id;
        }
        else {
            (0, Utils_1.obter_numero)();
            console.log("ID deve ser do tipo numero!\n");
        }
        if (this.validaNome(nome)) {
            this._nome = nome;
        }
        else {
            throw new Error(" Nome nao pode conter numeros e carecteres\n");
        }
        this._email = email;
        this._seguidores = [];
        this._seguindo = [];
    }
    get seguidores() {
        return this._seguidores;
    }
    get seguindo() {
        return this._seguindo;
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get email() {
        return this._email;
    }
    validaId(id) {
        return typeof id === 'number';
    }
    validaNome(nome) {
        return typeof nome === 'string';
    }
}
exports.Perfil = Perfil;
