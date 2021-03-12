$(document).ready(() => {
    $("#registrovat").click(() => {
        if(spravne()) {
            registrovat();
        }
    });
});

function spravne() {
    let hlaseni = $("#hlaseni");

    let jmeno = $("#jmeno").val().trim();
    let email = $("#email").val().trim();
    let heslo = $("#heslo").val().trim();
    let heslo_kontrola = $("#heslo_kontrola").val().trim();

    let podminka_jmena = (jmeno != "");
    let podminka_mailu = (email != "");
    let podminka_hesla = (heslo != "");
    let podminka_hesel = (heslo == heslo_kontrola);

    hlaseni.html(" ");

    if(!podminka_jmena)
        hlaseni.html(hlaseni.html() + "Jméno není vyplněné. ");
    if(!podminka_mailu)
        hlaseni.html(hlaseni.html() + "Email není vyplněný. ");
    if(!podminka_hesla)
        hlaseni.html(hlaseni.html() + "Heslo není vyplněné. ");
    if(!podminka_hesel)
        hlaseni.html(hlaseni.html() + "Hesla se neshodují. ");

    if(podminka_jmena && podminka_mailu && podminka_hesla && podminka_hesel)
        return true;
}

function registrovat() {
    let udaje = JSON.stringify({
        jmeno: $("#jmeno").val().trim(),
        email: $("#email").val().trim(),
        heslo: $("#heslo").val().trim(),
    });
    
    fetch("/registrace", {
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
            $("#hlaseni") = reakce.hlaseni;
        }
    });
}
