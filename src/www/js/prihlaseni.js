$(document).ready(() => {
    $("#prihlasit").click(() => {
        if(spravne()) {
            prihlasit();
        }
    });
});

function spravne() {
    let hlaseni = $("#hlaseni");

    let jmeno = $("#jmeno").val().trim();
    let heslo = $("#heslo").val().trim();

    let podminka_jmena = (jmeno != "");
    let podminka_hesla = (heslo != "");

    hlaseni.html(" ");

    if(!podminka_jmena)
        hlaseni.html(hlaseni.html() + "Jméno není vyplněné. ");
    if(!podminka_hesla)
        hlaseni.html(hlaseni.html() + "Heslo není vyplněné. ");

    if(podminka_jmena && podminka_hesla)
        return true;
}

function prihlasit() {
    let udaje = JSON.stringify({
        jmeno: $("#jmeno").val().trim(),
        heslo: $("#heslo").val().trim(),
    });
    
    fetch("/prihlaseni", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
        },
        body: udaje,
    })
    .then(odpoved => odpoved.json())
    .then(reakce => {
        if(reakce.uspech) {
            location.href = reakce.url;
        } else {
            $("#hlaseni").html(reakce.hlaseni);
        }
    });
}
