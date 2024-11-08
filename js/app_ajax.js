$(document).ready(function () {
    $('#buscarCiudad').on('input', function() { // Cambiado 'change' a 'input'
        const ciudad = $(this).val();
        // Activar búsqueda solo si la longitud es de al menos 3 caracteres
        if (ciudad.length >= 3) {
            cargarCiudades(ciudad);
        }
    });

    function cargarCiudades(ciudad) {
        const apiKey = 'a53a50481ec0651881fb30b16fd87dbc'; // Verifica si es válida
        const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${apiKey}`;

        $.get(apiUrl, function (data) {
            $('#opciones').empty(); // Limpiar las opciones previas
            var ciudades=[];

            // Agregar cada lugar de la API como opción en el datalist
            $.each(data, function (index, place) {
                var option = `<option value="${place.country}/${place.state}/${place.name}"></option>`;
                $('#opciones').append(option);
                ciudades.append(place)
            });
            return ciudades;
        }).fail(function () {
            alert('Error al realizar la solicitud a la API.');
        });
    }

    $('#btnBuscar').on('click', function() { // Cambiado 'change' a 'input'
        buscarCiudad(Buscado)
        
        
    });

    function buscarCiudad(Buscado){
        var buscado=$('#buscarCiudad').val();
        var location;
        if ("/" in buscado){
            buscandoDatos=buscando.split('/');
            location=buscandoDatos[buscandoDatos.length-1];
        }
        else{
            location=buscado;
        }
        ciudades=cargarCiudades(ciudad);
        return ciudades[0];
    }

});