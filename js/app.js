jQuery(document).ready(function () {
    var cardHome = $("#cardHome");
    var divSearch =$("#search");
    var divLocation =$("#location");
    var cardBuscar =$("#cardSearch");

    divSearch.hide();
    divLocation.hide();
    cardBuscar.hide();


    $("#lnkHome").on('click', function() {
        cardSearch.hide();
        cardHome.show();
    });

    $("#btnUbicacion").on('click', function() {
        divSearch.hide();
        divLocation.show();
        cardHome.hide();
        cardBuscar.show();
    });

    $("#lnkSearch").on('click', function() {
        divSearch.show();
        divLocation.hide();
        cardHome.hide();
        cardBuscar.show();
    });
});
