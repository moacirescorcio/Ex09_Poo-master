class Conta {
    private _nome: string;
    private _saldo: number;

    constructor( nome: string,  saldo: number){
        this._nome = nome;
        this._saldo = saldo;
    }

    get nome(){
       return this._nome
    }

    get saldo(){
        return this._saldo
    }
}

interface Tributavel{
    calcularTributos(): number;
}

class ContaCorrente extends Conta implements Tributavel{
    constructor(nome: string, saldo: number){
        super(nome,saldo);
    }

    calcularTributos(): number {
        return this.saldo * 0.1
    }
}

class SeguroDeVida implements Tributavel{
    calcularTributos(): number {
        return 50;
    }
}