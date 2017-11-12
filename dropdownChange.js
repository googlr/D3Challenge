$(function() {
    $("#sel-x").change(function() {
        alert( $('option:selected', this).text() );
    });
});