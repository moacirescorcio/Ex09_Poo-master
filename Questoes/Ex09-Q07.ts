/*
    Refaça a questão 04 do exercício usando interfaces com os métodos propostos
    em vez de herança. Crie também um script que instancie e teste diferentes formas
    geométricas.

*/
// Interface para Figuras Geométricas
interface FiguraGeometrica {
    // Método para calcular a área
    calcularArea(): number;

    // Método para calcular o perímetro
    calcularPerimetro(): number;
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
}

// Script para testar as diferentes formas geométricas
const quadrado = new Quadrado(5);
console.log('Quadrado - Área:', quadrado.calcularArea(), 'Perímetro:', quadrado.calcularPerimetro());

const triangulo = new Triangulo(5, 3, 3, 4, 5);
console.log('Triângulo - Área:', triangulo.calcularArea(), 'Perímetro:', triangulo.calcularPerimetro());
