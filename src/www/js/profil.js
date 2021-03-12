$(document).ready(() => {
    $("#odhlasit").click(() => {
        location.href = '/odhlasit';
    });

    $("#smazat").click(() => {
        location.href = '/smazani';
    });

    fetch("/uzivatel.json")
        .then(odpoved => odpoved.json())
        .then(uzivatel => {
            $("#uzivatel").html(uzivatel.jmeno);
        });
});
