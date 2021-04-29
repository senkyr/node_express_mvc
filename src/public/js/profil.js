$(document).ready(() => {
    $("#odhlasit").click(() => {
        location.href = '/uzivatel/odhlasit';
    });

    $("#smazat").click(() => {
        location.href = '/uzivatel/smazani';
    });

    fetch("/uzivatel/informace")
        .then(odpoved => odpoved.json())
        .then(uzivatel => {
            if(!uzivatel) {
                location.href = '/uzivatel/prihlaseni';
            }
        });
});
