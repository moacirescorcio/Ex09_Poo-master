/*
11. Crie uma classe chamada AuditoriaInterna que tenha dois métodos que tenha um
array de Tributaveis e os métodos:
a. adicionar(Tributável);
b. calcularTributos(): retorna um double que representa a soma de todos os
cálculos dos tributos de todos os tributáveis;
c. Crie uma classe de testes que instancie várias classes ContaCorrente e
SeguroDeVida, adicione-as na classe AuditoriaInterna e exiba o resultado

do método calculaTributos. Perceba que a classe de auditoria não se
preocupa que tipo de classe está sendo passada.
*/

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

class AuditoriaInterna {
    tributaveis: Tributavel[] = [];

    adicionar(tributavel: Tributavel): void {
        this.tributaveis.push(tributavel);
    }

    calcularTributos(): number {
        let totalTributos = 0;
        for (const tributavel of this.tributaveis) {
            totalTributos += tributavel.calcularTributos();
        }
        return totalTributos;
    }
}

//testando
const auditoria = new AuditoriaInterna();

const contaCorrente1 = new ContaCorrente("Conta1", 1000);
const contaCorrente2 = new ContaCorrente("Conta2", 2000);
const seguroDeVida = new SeguroDeVida();

auditoria.adicionar(contaCorrente1);
auditoria.adicionar(contaCorrente2);
auditoria.adicionar(seguroDeVida);

const totalTributos = auditoria.calcularTributos();

console.log(`Total de tributos a serem pagos: ${totalTributos}`);