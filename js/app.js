jQuery(document).ready(function () {
    var cardHome = $( "#cardHome" );
    var cardSearch =$( "#cardSearch" );
    var cardLocalitation =$( "#cardLocalitation" );

    cardSearch.hide();
    cardLocalitation.hide();


    $("#lnkHome").on('click', function() {
        cardSearch.hide();
        cardLocalitation.hide();
        cardHome.show();
    });

    $("#lnkLocation").on('click', function() {
        cardSearch.hide();
        cardLocalitation.show();
        cardHome.hide();
    });

    $("#lnkSearch").on('click', function() {
        cardSearch.show();
        cardLocalitation.hide();
        cardHome.hide();
    });

    $('#frmCiudad').submit(function (event) {
        var apiKey = 'fbf9fe2249c24292eeea81e49715a525';
        var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`;
        //UTILIZAR GEOCORDING APP.JS PARA HACERLO
    }
    //BUSCAR DENTRO DE ALGO DIAPOS. 14 (https://aula0.cuatrovientos.org/pluginfile.php/142372/mod_resource/content/1/UT3_JQUERY.pptx.pdf)
});
