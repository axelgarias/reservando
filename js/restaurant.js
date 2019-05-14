var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    this.horarios = this.horarios.filter(function(horario){
        return horario !== horarioReservado;
    })
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion <= 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return Math.round(promedio(this.calificaciones) * 10) / 10;
    }
}

function sumatoria(numeros){
    var sumatoria = 0;
        for (var i = 0; i < numeros.length; i++) {
            sumatoria += numeros[i]
        }
    return sumatoria
}

function promedio(numeros){
    var promedio = sumatoria(numeros)/numeros.length
    return promedio
}
