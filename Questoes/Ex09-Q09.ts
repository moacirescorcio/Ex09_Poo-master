/*
    09)Crie uma classe para testar os exemplos anteriores. Instancie várias formas
diferentes. Pegue duas formas chame em uma delas o método comparar
passando a outra como parâmetro e exiba o resultado. Repita para outras formas.

*/

interface FiguraGeometrica {
    // Método para calcular a área
    calcularArea(): number;

    // Método para calcular o perímetro
    calcularPerimetro(): number;
}

// Interface para comparação
interface IComparavel {
    // Método para comparar a área com outra forma geométrica
    comparar(outraForma: FiguraGeometrica): number;
}

// Implementação da interface para Quadrado
class Quadrado implements FiguraGeometrica {
    constructor(private lado: number) {
        this.lado = lado;
    }

    calcularArea(): number {
        return this.lado * this.lado;
    }

    calcularPerimetro(): number {
        return this.lado * 4;
    }

    comparar(outraForma: FiguraGeometrica): number {
        const minhaArea = this.calcularArea();
        const areaOutraForma = outraForma.calcularArea();

        if (minhaArea < areaOutraForma) {
            return -1;
        } else if (minhaArea > areaOutraForma) {
            return 1;
        } else {
            return 0;
        }
    }
}

// Implementação da interface para Triângulo
class Triangulo implements FiguraGeometrica {
    constructor(private base: number, private altura: number, private lado1: number, private lado2: number, private lado3: number) {}

    calcularArea(): number {
        return (this.base * this.altura) / 2;
    }

    calcularPerimetro(): number {
        return this.lado1 + this.lado2 + this.lado3;
    }

    comparar(outraForma: FiguraGeometrica): number {
        const minhaArea = this.calcularArea();
        const areaOutraForma = outraForma.calcularArea();

        if (minhaArea < areaOutraForma) {
            return -1;
        } else if (minhaArea > areaOutraForma) {
            return 1;
        } else {
            return 0;
        }
    }
}

// Criando instâncias das formas geométricas
const quadrado1 = new Quadrado(4);
const quadrado2 = new Quadrado(5);

const triangulo1 = new Triangulo(3, 4, 5, 4, 5);
const triangulo2 = new Triangulo(5, 12, 9, 7, 5);

// Testando comparações de área
console.log("Comparação de Quadrados:", quadrado1.comparar(quadrado2));
console.log("Comparação de Triângulos:", triangulo1.comparar(triangulo2));
console.log("Comparação entre Quadrado e Triângulo:", quadrado1.comparar(triangulo1));


