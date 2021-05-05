$(document).ready(() => {
    $("#odhlasit").click(() => {
        location.href = '/uzivatel/odhlasit';
    });

    $("#smazat").click(() => {
        location.href = '/uzivatel/smazani';
    });
});
