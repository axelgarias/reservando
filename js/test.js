var expect = chai.expect;

describe('Horarios', function() {
	it('El horario es eliminado del array', function() {
		listadoDeRestaurantes[1].reservarHorario('15:00');
		expect(listadoDeRestaurantes[1].horarios).to.include('12:30', '14:30').but.to.not.include('15:00');
	});
	it('Reserva horario inexistente',function() {
		listadoDeRestaurantes[1].reservarHorario('15:00');
		expect(listadoDeRestaurantes[1].horarios).to.have.lengthOf(2);
	});
	it('Reservar horario sin parametro',function(){
		listadoDeRestaurantes[1].reservarHorario();
		expect(listadoDeRestaurantes[1].horarios).to.have.lengthOf(2);
	});
	it('No se pueden reservar dos horarios',function(){
		listadoDeRestaurantes[1].reservarHorario('12:30','14:30');
		expect(listadoDeRestaurantes[1].horarios).to.have.lengthOf(1);
	});
})

describe('Puntuaciones',function(){
	it('El promedio se calcula correctamente',function() {
		var puntuacion = listadoDeRestaurantes[1].obtenerPuntuacion();
		expect(puntuacion).to.be.equal((7+7+3+9+7)/5)
	})
    it('Si el restaurant no tiene calificaciones, la puntuación es 0.',function(){
        var restaurant = listadoDeRestaurantes[2]
        restaurant['calificaciones']=[]
        var puntuación = restaurant.obtenerPuntuacion()
        expect(puntuación).to.be.equal(0)
    })	
})

describe("Calificar",function(){
	it("La verificacion que se hace es correcta, no se puede votar menos de 0 o mas de 10, ademas tiene que ser un numero entero",function(){
		var restaurant = listadoDeRestaurantes[1]
		restaurant.calificar(0.3)
		restaurant.calificar(11)
		restaurant.calificar(-1)
		expect(restaurant.calificaciones).to.have.lengthOf(5)
	})
	it("Calificar sin parametro y que el el array no cambie",function(){
		var restaurant = listadoDeRestaurantes[1]
		restaurant.calificar()
		expect(restaurant.calificaciones).to.have.lengthOf(5)
	})
})

describe('buscarRestaurante(id)', function(){
    it('La funcion se ejecuta correctamente y devuelve el restaurant buscado.',function(){
        var restaurant = listadoDeRestaurantes[5]
        var restaurantBuscado = listado.buscarRestaurante(6)
        expect(restaurant).to.be.eql(restaurantBuscado)
    })
    it('Si el ID que se pasa como parametro es menor a 1 se devuelve un error',function(){
        var restaurantBuscado = listado.buscarRestaurante(-1)
        expect(restaurantBuscado).to.be.eql('No se ha encontrado ningún restaurant')
    })
})

describe('Obtener restaurante',function(){
    it('Controlar si se agrega mas de un restaurant al arreglo.', function(){
        var restaurantesFiltrados = listado.obtenerRestaurantes(null,'Londres',null)
        var restaurantDeseados = [listadoDeRestaurantes[1],listadoDeRestaurantes[9],listadoDeRestaurantes[17],listadoDeRestaurantes[21]]
       expect(restaurantesFiltrados).to.be.eql(restaurantDeseados)
    })
    it('Controlar si el restaurant retornado es el mismo que el esperado.',function(){
        var restaurantFiltrados = listado.obtenerRestaurantes('Asiática','Londres','14:30')
        expect(restaurantFiltrados[0]).to.be.eql(listadoDeRestaurantes[1])
    })
})

describe('Calcular el precio base',function(){
    it('El calculo del precio base es el correcto', function(){
        let reservacion = new Reserva(new Date(2019, 5, 4, 13,0), 3, 650, "DES1")
        expect(reservacion.calcularPrecioBase()).to.be.eql(1950)  
    })
})

describe('Calcular el precio final',function(){
    it('Se testea el adicional por fin de semana, descuento por la cantidad de personas y código de descuento "DES1".', function(){
        var reservacion = new Reserva (new Date(2019, 5, 4, 11,0), 7, 650, 'DES1')
        expect(reservacion.calcularPrecioFinal()).to.be.eql(3445)
    })
    it('Se testea el adicional por el horario', function(){
	    var reservacion = new Reserva (new Date(2019, 5, 4, 14,0), 2, 650)
	    expect(reservacion.calcularPrecioFinal()).to.be.eql(1300+1300*0.05)
    })
    it('Se testea la reserva sin adicionales ni descuentos', function(){
        var reservacion = new Reserva (new Date(2019, 5, 4, 11,0), 2, 650)
        expect(reservacion.calcularPrecioFinal()).to.be.eql(1300)
    })
})