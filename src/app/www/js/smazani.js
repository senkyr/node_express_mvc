$(document).ready(() => {
    $("#potvrdit").click(() => {
        if(spravne) {
            potvrdit();
        }
    });
});

function spravne() {
    if($("#heslo").val().trim() == "")
        $("#hlaseni").html("Je třeba vyplnit heslo.");
    else
        return true;
}

function potvrdit() {
    let udaje = JSON.stringify({ heslo: $("#heslo").val().trim() });

    fetch("/smazat", {
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
