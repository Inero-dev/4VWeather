$(document).ready(function () {
    $('#buscarCiudad').on('input', function () {
        const ciudad = $(this).val();
        // Activar búsqueda solo si la longitud es de al menos 3 caracteres
        if (ciudad.length >= 3) {
            cargarCiudades(ciudad, null, null);
        }
    });

    function cargarCiudades(ciudad, pais, state) {
        const apiKey = 'f27acc15f51607bd6b7f2b51c26bdb81'; // Verifica si es válida
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
        const apiKey = 'f27acc15f51607bd6b7f2b51c26bdb81';
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (data) {
                pintarTiempoHoy(data);
                pintarDias(data);
            },
            error: function () {
                alert('Error al realizar la solicitud a la API de tiempo.');
            }
        });
    }

    //funciones para el tiempo:

    function pintarDias(tiempo) {
        $('#elTiempo4Dias').empty();
        for (let i = 0; i < 4; i++) { // Solo tomaremos los primeros 4 registros para los 4 días.
            const dayData = tiempo.list[i * 8]; // Usamos i * 8 para tomar datos aproximadamente cada 24 horas (3 horas * 8 = 24 horas)

            const cardDia = `
                <div class="col-lg-4 col-md-6 col-sm-12 d-flex pt-3">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="card-title">${new Date(dayData.dt * 1000).toLocaleDateString()}</h5>
                    </div>
                    <div class="card-body">
                      <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
                          <div class="container">
                            <div class="row">
                              <div class="col pt-3 align-items-center text-center">
                                <h1>
                                  ${(dayData.main.temp - 273.15).toFixed(1)}ºC
                                </h1>
                              </div>
                              <div class="col">
                                <img src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png" class="rounded d-block w-50" alt="Weather icon">
                              </div>
                              <div class="col">
                                <p>${dayData.weather[0].main}</p>
                                <p>${dayData.weather[0].description}</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <p class="text-primary">Min: ${(dayData.main.temp_min - 273.15).toFixed(1)}ºC</p>
                              </div>
                              <div class="col text-center">
                                <p class="text-danger">Max: ${(dayData.main.temp_max - 273.15).toFixed(1)}ºC</p>
                              </div>                           
                            </div>
                                <div class="row">
                                <div class="col">
                                    <p>Viento: ${dayData.wind.speed} m/s, Dirección: ${direccionViento(dayData.wind.deg)}</p>
                                </div>
                                </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            $('#elTiempo4Dias').append(cardDia);
        }
    }


    function pintarTiempoHoy(tiempo) {
        $('#elTiempoHoy').empty();
        const dayData = tiempo.list[0];

        const cadGeneral = `
        <div class="card w-50">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#general" role="tab"
          aria-controls="home" aria-selected="true">General</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="precipitaciones-tab" data-bs-toggle="tab" href="#precipitaciones" role="tab"
          aria-controls="precipitaciones" aria-selected="false">Precipitaciones</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="aire-tab" data-bs-toggle="tab" href="#aire" role="tab"
          aria-controls="aire" aria-selected="false">Aire</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <div class="tab-content" id="myTabContent">
      <!-- Tab General -->
      <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
        <div class="container">
          <div class="row">
            <div class="col pt-3 align-items-center text-center">
              <h1>${(dayData.main.temp - 273.15).toFixed(1)}ºC</h1>
            </div>
            <div class="col">
              <img src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png" class="rounded d-block w-50" alt="Weather icon">
            </div>
            <div class="col">
              <p>${dayData.weather[0].main}</p>
              <p>${dayData.weather[0].description}</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="text-primary ps-5">Min: ${(dayData.main.temp_min - 273.15).toFixed(1)}ºC</p>
            </div>
            <div class="col text-center">
              <p class="text-danger">Max: ${(dayData.main.temp_max - 273.15).toFixed(1)}ºC</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Precipitaciones -->
      <div class="tab-pane fade" id="precipitaciones" role="tabpanel" aria-labelledby="precipitaciones-tab">
        <div class="container">
          <div class="row">
            <div class="col">
              <p>Probabilidad: ${(dayData.pop * 100).toFixed(0)}%</p>
            </div>
            <div class="col">
              <p>Porcentaje de nubes: ${dayData.clouds.all}%</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p>Lluvia: ${(dayData.rain ? dayData.rain["3h"] : 0).toFixed(2)} mm</p>
            </div>
            <div class="col">
              <p>Nieve: ${(dayData.snow ? dayData.snow["3h"] : 0).toFixed(2)} mm</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Aire -->
      <div class="tab-pane fade" id="aire" role="tabpanel" aria-labelledby="aire-tab">
        <div class="container">
          <div class="row">
            <div class="col">
              <h4 class="pb-3">Sensación térmica: ${(dayData.main.feels_like - 273.15).toFixed(1)}ºC</h4>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p >Viento: ${dayData.wind.speed} m/s</p>
            </div>
            <div class="col">
              <p>Dirección: ${direccionViento(dayData.wind.deg)}</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p>Presión: ${dayData.main.pressure} hPa</p>
            </div>
            <div class="col">
              <p>Humedad: ${dayData.main.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

        $('#elTiempoHoy').append(cadGeneral);
    }

    $('#btnUbicacion').on('click', function () {
      // Verifica si el navegador admite geolocalización
      if (navigator.geolocation) {
          // Revisa si se ha otorgado o denegado el permiso previamente
          const permisosConcedidos = localStorage.getItem('permisoGeolocalizacion');
  
          // Si el permiso es "concedido", usamos la geolocalización sin preguntar nuevamente
          if (permisosConcedidos === 'concedido') {
              obtenerUbicacion();
          } else {
              // Solicitamos la geolocalización y guardamos el resultado
              navigator.geolocation.getCurrentPosition(
                  function (position) {
                      // Guardar los permisos en localStorage si se otorgan permanentemente
                      localStorage.setItem('permisoGeolocalizacion', 'concedido');
  
                      // Obtener latitud y longitud
                      const latitud = position.coords.latitude;
                      const longitud = position.coords.longitude;
  
                      // Mostrar resultados en el HTML
                      lat = latitud;
                      lon = longitud;
  
                      // Llama a otra función si es necesario
                      sacarTiempo();
                  },
                  function (error) {
                      // Manejo de errores
                      switch (error.code) {
                          case error.PERMISSION_DENIED:
                              alert("Permiso denegado por el usuario.");
                              // Elimina cualquier registro previo de permisos concedidos
                              localStorage.removeItem('permisoGeolocalizacion');
                              break;
                          case error.POSITION_UNAVAILABLE:
                              alert("La información de ubicación no está disponible.");
                              break;
                          case error.TIMEOUT:
                              alert("La solicitud de ubicación ha caducado.");
                              break;
                          case error.UNKNOWN_ERROR:
                              alert("Error desconocido al obtener ubicación.");
                              break;
                      }
                  }
              );
          }
      } else {
          alert("La geolocalización no es soportada por este navegador.");
      }
  });
  
  function obtenerUbicacion() {
      navigator.geolocation.getCurrentPosition(
          function (position) {
              const latitud = position.coords.latitude;
              const longitud = position.coords.longitude;
  
              // Mostrar resultados en el HTML
              lat = latitud;
              lon = longitud;
  
              sacarTiempo();
          }
      );
  }
  
  function direccionViento(grados){
    if (grados>337.5 || grados<=22.5 ){
      return "Norte"
    }
    if (grados>22.5 && grados<=67.5){
      return "Noreste"
    }
    if (grados>67.5 && grados<=112.5){
      return "Este"
    }
    if (grados>112.5 && grados<=157.5){
      return "Sureste"
    }
    if (grados>157.5&& grados<=202.5 ){
      return "Sur"
    }
    if (grados>202.5 && grados<=247.5){
      return "Suroeste"
    }
    if (grados>247.5 && grados<=292.5){
      return "Oeste"
    }
    if (grados>292.5 && grados<=337.5){
      return "Noroeste"
    }
  }

});
