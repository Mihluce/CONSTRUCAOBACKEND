function validarNumero(n) {
    if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new Error('Parâmetro inválido: espere números.');
    }
    }
    
    function somar(a, b) {
    validarNumero(a); validarNumero(b);
    return a + b;
    }
    
    function subtrair(a, b) {
    validarNumero(a); validarNumero(b);
    return a - b;
    }
    
    function multiplicar(a, b) {
    validarNumero(a); validarNumero(b);
    return a * b;
    }
    
    function dividir(a, b) {
    validarNumero(a); validarNumero(b);
    if (b === 0) throw new Error('Divisão por zero não é permitida.');
    return a / b;
    }
    
    function aoQuadrado(a) {
    validarNumero(a);
    return a * a;
    }
    
    function raizQuadrada(a) {
    validarNumero(a);
    if (a < 0) throw new Error('Não existe raiz quadrada real de número negativo.');
    return Math.sqrt(a);
    }
    
    module.exports = {
    somar,
    subtrair,
    multiplicar,
    dividir,
    aoQuadrado,
    raizQuadrada
    };