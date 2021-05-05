$(document).ready(() => {
    $('#pridat').click(pridat);
});

function pridat() {
    let nadpis = $('#nadpis').val().trim();
    let telo = $('#telo').val().trim();

    if(!nadpis) {
        $('#hlaseni').html('Chybí nadpis!');
    } else if(!telo) {
        $('#hlaseni').html('Chybí tělo!');
    } else {
        fetch('/poznamka/pridat', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                nadpis,
                telo,
            }),
        })
        .then(odpoved => odpoved.json())
        .then(reakce => {
            if(reakce.uspech) {
                location.href = reakce.url;
            } else {
                $('#hlaseni').html(reakce.hlaseni);
            }
        });
    }
}
