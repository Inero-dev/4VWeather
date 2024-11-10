# 4VWether
Esta página web esta creada sobre la base de la documentación de Bootstrap (https://getbootstrap.com/docs/5.3/getting-started/introduction/) Version: 5.3.
Teniendo en cuenta esto, hace mas facil trabajar en una sola página de (index.html) html. Para esto, se ha utilizado un archivo JavaSript que controle la accion de los botones y así mostrar y/o ocultar las distintas cards (app.js).
Además de estilos bootstrap, tambien se ha implementado parte con el SCSS. Esto se ha hecho por la efectividad y la facilidad para que toda la página muestre un estilo parecido como los comonentes.
En cuanto a las acciones de sacar infomación:

Se ha utilizado la API en la página OpenWeather para la obtención de las ciudades --> https://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${apiKey}
      Documentación: https://openweathermap.org/api/weathermaps
  Para hacer mas facil la eleccion de la ciudad en el buscador, se ha implementadouna funcion que ofrece las 5 ciudades en el formato de Pais/Provincia/Ciudad para eleguir y hacer mas facil en el caso que exista mas de una ciudad con ese nombre

Para obtener la informacion sobre la predicción meterológica se ha utilizado otra API de la misma página  -->https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}
      Documentación:https://openweathermap.org/api/hourly-forecast
      
Para la obtención de la ubicación actual del usuario se ha utilizado la implementación típica de JavaScript para trabajar con la API de geolocalización en navegadores:
        Documentación: https://developer.mozilla.org/es/docs/Web/API/Geolocation_API
    -->localStorage.getItem('permisoGeolocalizacion'); para preguntar si se concede el acceso
    -->navigator.geolocation.getCurrentPosition para obtener la localización una vez concedida

    -->Para guardar la preferencia de permisos: https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

Se utiliza el widget de traducción de Google Translate para permitir que los usuarios traduzcan la página web a otros idiomas. El código sigue la implementación estándar del widget de Google Translate
    Documentación: https://cloud.google.com/architecture?hl=es-419 //  https://developer.mozilla.org/es/
    Apuntes importantes: Según documentacion de Translate Cloud se recomienda implementar en el mismo html el script
