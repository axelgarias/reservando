let Reserva = function(horario, cantidad, precioPorPersona, codigo) {
    this.horario = horario;
    this.cantidad = cantidad;
    this.precioPorPersona = precioPorPersona;
    this.codigo = codigo;
};

Reserva.prototype.calcularPrecioBase = function calcularPrecioBaseFn() {
    return this.cantidad * this.precioPorPersona;
};

Reserva.prototype.calcularPrecioFinal = function calcularPrecioFinalFn() {
    return this.calcularPrecioBase() - this.descuentos() + this.adicionales();
};

Reserva.prototype.descuentos = function descuentosFn() {
    let descuentos = 0;

    if (this.cantidad >= 4 && this.cantidad <= 6) {
        descuentos += (this.calcularPrecioBase() * 5) / 100;
    } else if (this.cantidad >= 7 && this.cantidad <= 8) {
        descuentos += (this.calcularPrecioBase() * 10) / 100;
    } else if (this.cantidad > 8) {
        descuentos += (this.calcularPrecioBase() * 15) / 100;
    }

    if (this.codigo === 'DES1') {
        descuentos += this.precioPorPersona;
    } else if (this.codigo === 'DES15') {
        descuentos += (this.calcularPrecioBase() * 15) / 100;
    } else if (this.codigo === 'DES200') {
        descuentos += 200;
    }

    return descuentos;
};

Reserva.prototype.adicionales = function adicionalesFn() {
    let adicionales = 0;
    
    if (this.horario.getHours() >= 13 && this.horario.getHours() <= 14) {
        adicionales += (this.calcularPrecioBase() * 5) / 100;
    }

    if (this.horario.getDay() >= 5 && this.horario.getDay() <= 7) {
        adicionales += (this.calcularPrecioBase() * 10) / 100;
    }

    return adicionales;
};