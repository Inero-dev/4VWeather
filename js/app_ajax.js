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

            // Agregar cada lugar de la API como opción en el datalist
            $.each(data, function (index, place) {
                var option = `<option value="${place.country}/${place.state}/${place.name}"></option>`;
                $('#opciones').append(option);
            });

        }).fail(function () {
            alert('Error al realizar la solicitud a la API.');
        });
    }
});