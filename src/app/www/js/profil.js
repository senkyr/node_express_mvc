$(document).ready(() => {
    $("#odhlasit").click(() => {
        location.href = '/uzivatel/odhlasit';
    });

    $("#smazat").click(() => {
        location.href = '/smazani';
    });

    fetch("/uzivatel/informace")
        .then(odpoved => odpoved.json())
        .then(uzivatel => {
            $("#uzivatel").html(uzivatel.jmeno);
        });
});
