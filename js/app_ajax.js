$(document).ready(function () {
    $('#buscarCiudad').on('input', function () {
        const ciudad = $(this).val();
        // Activar búsqueda solo si la longitud es de al menos 3 caracteres
        if (ciudad.length >= 3) {
            cargarCiudades(ciudad, null, null);
        }
    });

    function cargarCiudades(ciudad, pais, state) {
        const apiKey = '1c5507e30079bc885612e3feb2cd6da9'; // Verifica si es válida
        const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${apiKey}`;

        return $.get(apiUrl, function (data) {
            $('#opciones').empty(); // Limpiar las opciones previas
            let ciudades = [];

            // Agregar cada lugar de la API como opción en el datalist
            $.each(data, function (index, place) {
                const option = `<option value="${place.country}/${place.state}/${place.name}"></option>`;
                $('#opciones').append(option);
                ciudades.push(place);
            });

            let ciudadesFiltradas = [];
            if (state && pais) {
                ciudadesFiltradas = ciudades.filter(ciudad => ciudad.state === state && ciudad.country === pais);
            } else {
                ciudadesFiltradas = ciudades;
            }
            return ciudadesFiltradas;
        }).fail(function () {
            alert('Error al realizar la solicitud a la API.');
        });
    }

    let lat = 0;
    let lon = 0;

    $('#btnBuscar').on('click', function () {
        buscarCiudad();
    });

    function buscarCiudad() {
        const buscado = $('#buscarCiudad').val();
        let location;
        let pais, state;

        if (buscado.includes("/")) {
            const buscandoDatos = buscado.split('/');
            location = buscandoDatos[2];
            if (buscandoDatos.length === 3) {
                pais = buscandoDatos[0];
                state = buscandoDatos[1];
            }
        } else {
            location = buscado;
        }

        cargarCiudades(location, pais, state).done(function (ciudades) {
            if (!ciudades || ciudades.length === 0) {
                alert("No hay ninguna ciudad con ese nombre");
            } else {
                lat = ciudades[0].lat;
                lon = ciudades[0].lon;
                sacarTiempo();
            }
        });
    }

    function sacarTiempo() {
        const apiKey = '50de2cdfa960168b49159e1bc2baa4a5'; // Verifica si es válida
        const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.get(apiUrl, function (data) {
            pintarTiempoHoy(data)
        }).fail(function () {
            alert('Error al realizar la solicitud a la API de tiempo.');
        });
    }

    //funciones para el tiempo:

    function setImagen(iconId) {

    }

    function pintarTiempoHoy(tiempo) {
        const cadGeneral = `
    <div class="card w-50">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#general" role="tab"
              aria-controls="home" aria-selected="true">General</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="profile-tab" data-bs-toggle="tab" href="#dia" role="tab"
              aria-controls="profile" aria-selected="false">Día</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-bs-toggle="tab" href="#noche" role="tab"
              aria-controls="profile" aria-selected="false">Noche</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
            <div class="container">
              <div class="row">
                <div class="col pt-3 align-items-center text-center">
                  <h1>
                    ${(tiempo.current.temp - 273.15).toFixed(1)}ºC
                  </h1>
                </div>
                <div class="col">
                  <img src="https://openweathermap.org/img/wn/${tiempo.current.weather[0].icon}@2x.png" class="rounded d-block w-50" alt="Weather icon">
                </div>
                <div class="col">
                  <p>${tiempo.current.weather[0].main}</p>
                  <p>${tiempo.current.weather[0].description}</p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="text-primary ps-5">Min: ${(tiempo.daily[0].temp.min - 273.15).toFixed(1)}ºC</p>
                </div>
                <div class="col text-center">
                  <p class="text-danger">Max: ${(tiempo.daily[0].temp.max - 273.15).toFixed(1)}ºC</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col">
                  <p>Viento: ${tiempo.current.wind_speed} km/h</p>
                </div>
                <div class="col">
                  <p>Dirección: ${tiempo.current.wind_deg}°</p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p>Sensación térmica: ${(tiempo.current.feels_like - 273.15).toFixed(1)}ºC</p>
                </div>
                <div class="col">
                  <p>Porcentaje de nubes: ${tiempo.current.clouds}%</p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p>Humedad: ${tiempo.current.humidity}%</p>
                </div>
                <div class="col">
                  <p>Precipitaciones: ${(tiempo.daily[0].rain || 0).toFixed(2)} mm/h</p>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="dia" role="tabpanel" aria-labelledby="dia-tab">
            <div class="container">
              <div class="row">
                <div class="col pt-3 ps-5 align-items-center">
                  <h1>${(tiempo.daily[0].temp.day - 273.15).toFixed(1)}ºC</h1>
                </div>
                <div class="col">
                  <img src="https://openweathermap.org/img/wn/${tiempo.daily[0].weather[0].icon}@2x.png" class="rounded d-block w-50" alt="Weather icon">
                </div>
                <div class="col">
                  <p>${tiempo.daily[0].weather[0].main}</p>
                  <p>${tiempo.daily[0].weather[0].description}</p>
                </div>
              </div>
              <hr>
              <div class="container">
                <div class="row">
                  <div class="col">
                    <p>Viento: ${tiempo.daily[0].wind_speed} km/h</p>
                  </div>
                  <div class="col">Amanecer: ${new Date(tiempo.daily[0].sunrise * 1000).toLocaleTimeString()}</div>
                </div>
                <div class="row">
                  <div class="col">
                    <p>Sensación térmica: ${(tiempo.daily[0].feels_like.day - 273.15).toFixed(1)}ºC</p>
                  </div>
                  <div class="col">
                    <p>Porcentaje de nubes: ${tiempo.daily[0].clouds}%</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <p>Humedad: ${tiempo.daily[0].humidity}%</p>
                  </div>
                  <div class="col">
                    <p>Precipitaciones: ${(tiempo.daily[0].rain || 0).toFixed(2)} mm/h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="noche" role="tabpanel" aria-labelledby="noche-tab">
            <div class="container">
              <div class="row">
                <div class="col pt-3 ps-5 align-items-center">
                  <h1>${(tiempo.daily[0].temp.night - 273.15).toFixed(1)}ºC</h1>
                </div>
                <div class="col">
                  <img src="https://openweathermap.org/img/wn/${tiempo.daily[0].weather[0].icon}@2x.png" class="rounded d-block w-50" alt="Weather icon">
                </div>
                <div class="col">
                  <p>${tiempo.daily[0].weather[0].main}</p>
                  <p>${tiempo.daily[0].weather[0].description}</p>
                </div>
              </div>
              <hr>
              <div class="container">
                <div class="row">
                  <div class="col">
                    <p>Viento: ${tiempo.daily[0].wind_speed} km/h</p>
                  </div>
                  <div class="col">Atardecer: ${new Date(tiempo.daily[0].sunset * 1000).toLocaleTimeString()}</div>
                </div>
                <div class="row">
                  <div class="col">
                    <p>Sensación térmica: ${(tiempo.daily[0].feels_like.night - 273.15).toFixed(1)}ºC</p>
                  </div>
                  <div class="col">
                    <p>Porcentaje de nubes: ${tiempo.daily[0].clouds}%</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <p>Humedad: ${tiempo.daily[0].humidity}%</p>
                  </div>
                  <div class="col">
                    <p>Precipitaciones: ${(tiempo.daily[0].rain || 0).toFixed(2)} mm/h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
        document.body.innerHTML = cadGeneral;
    }
});
