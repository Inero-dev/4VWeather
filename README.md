# Proyecto: Aplicación Meteorológica con Bootstrap y OpenWeather API

Esta aplicación web muestra la predicción meteorológica basada en la ubicación del usuario o en búsquedas de ciudades específicas. Está construida con **Bootstrap 5.3**, **JavaScript**, y **SCSS**, y hace uso de varias APIs de **OpenWeather** para obtener la información climática.

## Tecnologías Utilizadas

- **Bootstrap 5.3**: Facilita la creación de una interfaz moderna y responsiva.
  - Documentación: [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- **JavaScript**: Controla la funcionalidad de los botones, mostrando y ocultando contenido mediante un archivo de script (`app.js`). Además se aplican funciones como obtener la ciudad implementando las APIs especificadas a continuación (app_ajax.js). 
- **SCSS**: Proporciona personalización adicional de estilos para lograr coherencia visual con los componentes de Bootstrap.

---

## Funcionalidades Principales

1. **Selección de Ciudades**:
   - Usa la **API de OpenWeather** para obtener las ciudades mediante un formato de búsqueda que muestra `País/Provincia/Ciudad`. Esto facilita seleccionar entre múltiples ciudades con nombres similares.
   - Endpoint de la API de ciudades: [OpenWeather Geo API](https://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${apiKey})
   - Documentación: [API de Geocodificación de OpenWeather](https://openweathermap.org/api/weathermaps)

2. **Predicción Meteorológica**:
   - La aplicación obtiene los datos de predicción meteorológica utilizando otra API de OpenWeather, mostrando la información en un formato de pronóstico por horas.
   - Endpoint de la API de pronóstico: [OpenWeather Forecast API](https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey})
   - Documentación: [API de Pronóstico Horario de OpenWeather](https://openweathermap.org/api/hourly-forecast)

3. **Ubicación Actual del Usuario**:
   - Implementa la API de geolocalización del navegador para determinar la ubicación del usuario, siempre y cuando este otorgue el permiso.
   - Documentación: [API de Geolocalización - MDN](https://developer.mozilla.org/es/docs/Web/API/Geolocation_API)
   - Se utiliza `localStorage` para guardar la preferencia del usuario sobre la geolocalización, de modo que no se solicite repetidamente:
     - Almacenar preferencia: `localStorage.getItem('permisoGeolocalizacion')`
     - Obtener ubicación: `navigator.geolocation.getCurrentPosition`

4. **Traducción de la Página**:
   - La aplicación integra el widget de **Google Translate** para permitir a los usuarios traducir el contenido a otros idiomas.
   - Documentación: [Widget de Google Translate](https://cloud.google.com/architecture?hl=es-419)

---

# Estructura de Archivos

4VWeather/
├── index.html         # Página principal con estructura HTML y widgets
├── css/
│   └── styles.css   # Estilos personalizados en CSS
│   └── styles.css.map
├── scss/
│   └── styles.scss   # Estilos personalizados en SCSS
│   └── componentes.scss      #Estilos de los componentes de la página
│   └── mixins.scss      #Mixins para implementar despues
│   └── variables.scss      #Variables en SCSS para difinir la paleta de colores y definir estilo unificado en toda la página
├── imagenes/
│   └── *imagen del fondo (Nubes)
├── js/
│   └── app.js         # Funciones en JavaScript para manejar eventos y controlar la interacción con los botones y navegación
│   └── app_ajax.js         # Funciones en JavaScript para manejar eventos y controlar la información que se va a mostrar
├── README.md          # Documentación del proyecto
├── User Journey          # Documentación de uso del proyecto
├── Diseño_figma          # Diseño de la página en figma


## Configuración Inicial
1. Clonar el repositorio: Abre la terminal y clona el repositorio a tu máquina local:
   git clone https://github.com/tu-usuario/4VWeather.git
## Para contribuir

1. Haz un fork del repositorio.

2. Crea una rama para tu nueva funcionalidad o corrección de errores:
      git checkout -b nombre-de-la-rama
   
3. Realiza tus cambios. Asegúrate de que el código funciona correctamente y no rompe la funcionalidad existente.

4. Sube los cambios a tu fork:
      git push origin nombre-de-la-rama

5. Abre un Pull Request para revisión. Describe los cambios realizados y por qué se deben fusionar.

## Notas Importantes
-->Google Translate: Según la documentación de Translate Cloud, se recomienda implementar el widget directamente en el archivo HTML, como está hecho en este proyecto.
                  Documentación: Google Translate Widget

-->Geolocalización: La aplicación utiliza la API de Geolocalización de los navegadores para obtener la ubicación del usuario. El permiso para acceder a esta información se almacena en localStorage, lo que asegura que no se le pida al usuario cada vez que se carga la página.
                  Documentación: Geolocalización - MDN
                  
-->Configuración del API Key de OpenWeather: No olvides reemplazar la variable apiKey con tu propia clave API en el archivo app.js o donde corresponda en el proyecto
