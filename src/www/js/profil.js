$(document).ready(() => {
    $("#odhlasit").click(() => {
        location.href = '/odhlasit';
    });

    fetch("/uzivatel.json")
        .then(odpoved => odpoved.json())
        .then(uzivatel => {
            $("#uzivatel").html(uzivatel.jmeno);
        });
});
