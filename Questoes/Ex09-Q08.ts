/*
    Crie uma interface chamada IComparavel com um método chamado comparar que
receba uma forma geométrica como parâmetro e retorna um inteiro como
resultado. Implemente em cada uma das classes do exemplo anterior a interface
retornando -1, 0 e 1 caso a área da forma seja menor, igual ou maior que a
passada via parâmetro.

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


